/**
 * PROJECT HIRING & MILESTONE LOGIC - Freelancer Website
 * Demonstration of the workflow for hiring freelancers, assigning projects, 
 * and automated status management (the business logic foundation for payments).
 */

const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const Project = require("../models/Project");
const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/auth");

// APPROVE APPLICATION & ASSIGN PROJECT
router.patch("/:id/approve", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "client") {
            return res.status(403).json({ message: "Only clients can approve applications" });
        }

        const application = await Application.findById(req.params.id).populate("projectId");
        if (!application) return res.status(404).json({ message: "Application not found" });

        // Security check: Verify project ownership
        if (application.projectId.clientId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized operation" });
        }

        // 1. UPDATE APPLICATION STATUS
        application.status = "Accepted";
        await application.save();

        // 2. ASSIGN FREELANCER & START PROJECT
        await Project.findByIdAndUpdate(application.projectId._id, {
            freelancerId: application.freelancerId,
            status: "In Progress"
        });

        // 3. AUTO-REJECT OTHER CANDIDATES
        await Application.updateMany(
            {
                projectId: application.projectId._id,
                _id: { $ne: application._id },
                status: "Pending"
            },
            { $set: { status: "Rejected" } }
        );

        // 4. GENERATE NOTIFICATIONS
        await Notification.create({
            recipientId: application.freelancerId,
            senderId: req.user.id,
            type: "project_assigned",
            message: `You have been officially hired for project '${application.projectId.name}'`,
            projectId: application.projectId._id
        });

        res.json({ message: "Freelancer successfully hired", application });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
