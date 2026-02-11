const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const User = require("../models/User");
const Project = require("../models/Project");
const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/auth");
const sanitize = require("../utils/sanitize");

// POST /api/applications - Submit a job application (Freelancer only)
router.post("/", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "freelancer") {
            return res.status(403).json({ message: "Only freelancers can apply for jobs" });
        }

        const { projectId, coverLetter, proposedRate, estimatedDuration, dateOfBirth, videoIntro } = req.body;

        // Input validation
        if (!projectId || !coverLetter || !proposedRate || !estimatedDuration) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Age verification (must be 18+)
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

        // Check for duplicate application
        const existingApplication = await Application.findOne({
            projectId,
            freelancerId: req.user.id
        });

        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }

        // Sanitize inputs
        const sanitizedCoverLetter = coverLetter.trim();
        const sanitizedDuration = estimatedDuration.trim();

        // Create application
        const application = await Application.create({
            projectId,
            freelancerId: req.user.id,
            coverLetter: sanitize(coverLetter),
            proposedRate: Number(proposedRate),
            estimatedDuration: sanitize(estimatedDuration),
            videoIntro: videoIntro ? videoIntro.trim() : "",
        });

        // Auto-create notification for the client who owns the project
        try {
            const project = await Project.findById(projectId);
            const freelancer = await User.findById(req.user.id);
            if (project && freelancer) {
                await Notification.create({
                    recipientId: project.clientId,
                    senderId: req.user.id,
                    type: "application_received",
                    message: `${freelancer.name} applied for your project '${project.name}'`,
                    projectId: project._id,
                    applicationId: application._id
                });
            }
        } catch (notifErr) {
            console.error("Failed to create notification:", notifErr);
            // Don't fail the application submission if notification fails
        }

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

// GET /api/applications - Get applications (filtered by user role)
router.get("/", authMiddleware, async (req, res) => {
    try {
        let query = {};

        if (req.user.role === "freelancer") {
            query.freelancerId = req.user.id;
        } else if (req.user.role === "client") {
            // Get applications for client's projects
            const Project = require("../models/Project");
            const clientProjects = await Project.find({ clientId: req.user.id }).select("_id");
            const projectIds = clientProjects.map(p => p._id);
            query.projectId = { $in: projectIds };
        }

        const applications = await Application.find(query)
            .populate({
                path: "projectId",
                select: "name task budget",
                populate: {
                    path: "clientId",
                    select: "name email"
                }
            })
            .populate("freelancerId", "name email")
            .sort({ appliedAt: -1 });

        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH /api/applications/:id/approve - Client approves an application
router.patch("/:id/approve", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "client") {
            return res.status(403).json({ message: "Only clients can approve applications" });
        }

        const application = await Application.findById(req.params.id)
            .populate("projectId");

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        // Verify the client owns this project
        if (application.projectId.clientId.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can only approve applications for your own projects" });
        }

        // Update application status
        application.status = "Accepted";
        await application.save();

        // Assign freelancer to the project and set status to In Progress
        await Project.findByIdAndUpdate(application.projectId._id, {
            freelancerId: application.freelancerId,
            status: "In Progress"
        });

        // Reject all other pending applications for this project
        await Application.updateMany(
            {
                projectId: application.projectId._id,
                _id: { $ne: application._id },
                status: "Pending"
            },
            { $set: { status: "Rejected" } }
        );

        // Notify the freelancer that they've been assigned
        const project = application.projectId;
        await Notification.create({
            recipientId: application.freelancerId,
            senderId: req.user.id,
            type: "project_assigned",
            message: `You have been assigned to project '${project.name}'`,
            projectId: project._id,
            applicationId: application._id
        });

        // Notify rejected freelancers
        const rejectedApps = await Application.find({
            projectId: project._id,
            _id: { $ne: application._id },
            status: "Rejected"
        });

        for (const rejApp of rejectedApps) {
            await Notification.create({
                recipientId: rejApp.freelancerId,
                senderId: req.user.id,
                type: "application_rejected",
                message: `Your application for '${project.name}' was not selected`,
                projectId: project._id,
                applicationId: rejApp._id
            });
        }

        res.json({ message: "Application approved and project assigned", application });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH /api/applications/:id/reject - Client rejects an application
router.patch("/:id/reject", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "client") {
            return res.status(403).json({ message: "Only clients can reject applications" });
        }

        const application = await Application.findById(req.params.id)
            .populate("projectId");

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        // Verify the client owns this project
        if (application.projectId.clientId.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can only reject applications for your own projects" });
        }

        application.status = "Rejected";
        await application.save();

        // Notify the freelancer
        await Notification.create({
            recipientId: application.freelancerId,
            senderId: req.user.id,
            type: "application_rejected",
            message: `Your application for '${application.projectId.name}' was not selected`,
            projectId: application.projectId._id,
            applicationId: application._id
        });

        res.json({ message: "Application rejected", application });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
