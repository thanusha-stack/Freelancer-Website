/**
 * BACKEND CONTROLLER SHOWCASE - Freelancer Website
 * Handles core project operations with role-based access control.
 */

const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const authMiddleware = require("../middleware/auth");
const sanitize = require("../utils/sanitize");

// CREATE PROJECT (Client Only)
router.post("/", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "client") {
            return res.status(403).json({ message: "Only clients can post projects" });
        }

        const { name, task, description, budget, deadline } = req.body;

        // Secure data handling
        const project = await Project.create({
            name: sanitize(name),
            task: sanitize(task),
            description: sanitize(description) || "",
            budget,
            deadline,
            clientId: req.user.id,
            status: "Pending",
        });

        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// BROWSE PROJECTS (Filtered by status)
router.get("/browse", authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find({ status: "Pending" })
            .populate("clientId", "name email companyName")
            .sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
