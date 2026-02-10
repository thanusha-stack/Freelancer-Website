const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const sanitize = require("../utils/sanitize");
router.post("/", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "freelancer") {
            return res.status(403).json({ message: "Only freelancers can apply for jobs" });
        }

        const { projectId, coverLetter, proposedRate, estimatedDuration, dateOfBirth } = req.body;
        if (!projectId || !coverLetter || !proposedRate || !estimatedDuration) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (dateOfBirth) {
            const dob = new Date(dateOfBirth);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                age--;
            }

            if (age < 18) {
                return res.status(400).json({ message: "You must be at least 18 years old to apply" });
            }
        }
        const existingApplication = await Application.findOne({
            projectId,
            freelancerId: req.user.id
        });

        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }
        const sanitizedCoverLetter = coverLetter.trim();
        const sanitizedDuration = estimatedDuration.trim();
        const application = await Application.create({
            projectId,
            freelancerId: req.user.id,
            coverLetter: sanitize(coverLetter),
            proposedRate: Number(proposedRate),
            estimatedDuration: sanitize(estimatedDuration),
        });

        res.status(201).json({
            message: "Application submitted successfully",
            application
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }
        res.status(500).json({ message: err.message });
    }
});
router.get("/", authMiddleware, async (req, res) => {
    try {
        let query = {};

        if (req.user.role === "freelancer") {
            query.freelancerId = req.user.id;
        } else if (req.user.role === "client") {
            const Project = require("../models/Project");
            const clientProjects = await Project.find({ clientId: req.user.id }).select("_id");
            const projectIds = clientProjects.map(p => p._id);
            query.projectId = { $in: projectIds };
        }

        const applications = await Application.find(query)
            .populate("projectId", "name task budget")
            .populate("freelancerId", "name email")
            .sort({ appliedAt: -1 });

        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
