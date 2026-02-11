const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const authMiddleware = require("../middleware/auth"); // We will create this middleware file
const sanitize = require("../utils/sanitize");

// GET /api/projects/browse - Browse all available (Pending) projects
// This is public for all authenticated users to find jobs to apply for
router.get("/browse", authMiddleware, async (req, res) => {
    try {
        const { status } = req.query;
        const query = { status: status || "Pending" };

        const projects = await Project.find(query)
            .populate("clientId", "name email companyName")
            .sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/projects - Get user's own projects (filtered by role)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const { role, id } = req.user;
        const { status } = req.query;
        let query = {};

        if (role === "client") {
            query.clientId = id;
        } else if (role === "freelancer") {
            // Only show projects explicitly assigned to this freelancer
            query.freelancerId = id;
        }
        // Admin sees all (no filter)

        // Optional status filter
        if (status) {
            query.status = status;
        }

        const projects = await Project.find(query).populate("clientId", "name email");
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/projects/my-applied - Get projects the freelancer has applied for
const Application = require("../models/Application");

router.get("/my-applied", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "freelancer") {
            return res.status(403).json({ message: "Only freelancers can access this endpoint" });
        }

        // Find all applications by this freelancer
        const applications = await Application.find({ freelancerId: req.user.id })
            .populate({
                path: "projectId",
                populate: {
                    path: "clientId",
                    select: "name email"
                }
            });

        // Extract the project data from each application, include application status
        const projects = applications
            .filter(app => app.projectId) // Filter out any with deleted projects
            .map(app => ({
                ...app.projectId.toObject(),
                applicationStatus: app.status,
                applicationId: app._id
            }));

        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/projects/:id - Get single project by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate("clientId", "name email companyName");

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/projects - Create a new project (Client only)
router.post("/", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "client") {
            return res.status(403).json({ message: "Only clients can post projects" });
        }

        const { name, task, description, budget, deadline } = req.body;

        // Input validation
        if (!name || !task) {
            return res.status(400).json({ message: "Project name and task are required" });
        }

        // Sanitize inputs (basic)
        const sanitizedName = name.trim();
        const sanitizedTask = task.trim();

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

// PATCH /api/projects/:id - Update project status
router.patch("/:id", authMiddleware, async (req, res) => {
    try {
        const { status, action } = req.body;
        const project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ message: "Project not found" });

        // Add more granular permission checks here if needed

        if (status) project.status = status;
        if (action) project.action = action;

        await project.save();
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
