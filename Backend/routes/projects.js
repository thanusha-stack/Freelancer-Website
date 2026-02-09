const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const authMiddleware = require("../middleware/auth"); // We will create this middleware file

// GET /api/projects - Get all projects (filtered by user role)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const { role, id } = req.user;
        let query = {};

        if (role === "client") {
            query.clientId = id;
        } else if (role === "freelancer") {
            // Freelancers might see all open projects OR projects assigned to them
            // For now, let's show projects assigned to them OR open projects
            query.$or = [{ freelancerId: id }, { status: "Pending" }];
        }

        const projects = await Project.find(query).populate("clientId", "name email");
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
            name: sanitizedName,
            task: sanitizedTask,
            description: description?.trim() || "",
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
