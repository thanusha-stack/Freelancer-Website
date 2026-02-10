const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const authMiddleware = require("../middleware/auth"); 
const sanitize = require("../utils/sanitize");
router.get("/", authMiddleware, async (req, res) => {
    try {
        const { role, id } = req.user;
        let query = {};

        if (role === "client") {
            query.clientId = id;
        } else if (role === "freelancer") {
            query.$or = [{ freelancerId: id }, { status: "Pending" }];
        }

        const projects = await Project.find(query).populate("clientId", "name email");
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
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
router.post("/", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "client") {
            return res.status(403).json({ message: "Only clients can post projects" });
        }

        const { name, task, description, budget, deadline } = req.body;
        if (!name || !task) {
            return res.status(400).json({ message: "Project name and task are required" });
        }
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
router.patch("/:id", authMiddleware, async (req, res) => {
    try {
        const { status, action } = req.body;
        const project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ message: "Project not found" });

        if (status) project.status = status;
        if (action) project.action = action;

        await project.save();
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
