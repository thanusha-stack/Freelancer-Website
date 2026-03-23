const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const sanitize = require("../utils/sanitize");

// GET /api/users - Get users (with optional role filter)
// Public endpoint for displaying freelancers on client dashboard
router.get("/", async (req, res) => {
    try {
        const { role } = req.query;
        console.log(`GET /api/users hit with role: ${role}`);
        let query = {};

        if (role) {
            query.role = role;
        }

        const users = await User.find(query).select("-password -googleId");
        console.log(`Found ${users.length} users for role ${role}`);
        res.json(users);
    } catch (err) {
        console.error("Error in GET /api/users:", err);
        res.status(500).json({ message: err.message });
    }
});

// GET /api/users/me - Get current user profile
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/users/:id - Get specific user profile (public)
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password -googleId");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error("Error in GET /api/users/:id:", err);
        res.status(500).json({ message: err.message });
    }
});


// PUT /api/users/profile - Update user profile
const upload = require("../middleware/upload");

router.put("/profile", authMiddleware, (req, res, next) => {
    // Wrap multer to handle errors and proceed even if it's not multipart
    upload.single("resume")(req, res, (err) => {
        if (err) {
            console.error("Multer error:", err);
        }
        next();
    });
}, async (req, res) => {
    console.log("PUT /api/users/profile reached");
    console.log("User ID:", req.user.id);
    console.log("Request Body:", req.body);
    console.log("File:", req.file);

    try {
        const data = req.body;
        const updates = {};
        for (const key in data) {
            updates[key] = sanitize(data[key]);
        }

        // Handle file upload
        if (req.file) {
            updates.resume = req.file.path;
        }

        // Prevent updating sensitive fields via this route
        delete updates.password;
        delete updates.googleId;
        delete updates.email;

        // Also set isProfileComplete to true
        updates.isProfileComplete = true;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select("-password");

        console.log("Profile updated successfully for user:", req.user.id);
        res.json(user);
    } catch (err) {
        console.error("Error in PUT /api/users/profile:", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
