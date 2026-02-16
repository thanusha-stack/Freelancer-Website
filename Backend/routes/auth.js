const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");

const SECRET = process.env.JWT_SECRET || "SECRET_KEY";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields required" });

        const existing = await User.findOne({ email });
        if (existing)
            return res.status(400).json({ message: "Already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const allowedRoles = ["client", "freelancer"];
        const userRole = allowedRoles.includes(role) ? role : "client";

        await User.create({
            name,
            email,
            password: hashedPassword,
            role: userRole,
        });

        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "Email not found" });

        // Strict Role Enforcement
        if (role && user.role !== role) {
            return res.status(403).json({ message: `Access denied. Your account is registered as a ${user.role}.` });
        }

        if (!user.password)
            return res.status(400).json({ message: "Use Google Login" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user: {
                role: user.role,
                isProfileComplete: user.isProfileComplete,
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/google-login", async (req, res) => {
    try {
        const { token, role } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, sub } = payload;

        let user = await User.findOne({ email });

        if (user) {
            // Strict Role Enforcement for existing users
            if (role && user.role !== role) {
                return res.status(403).json({ message: `Access denied. Your account is registered as a ${user.role}.` });
            }
        } else {
            const allowedRoles = ["client", "freelancer"];
            const userRole = allowedRoles.includes(role) ? role : "client";

            user = await User.create({
                name,
                email,
                googleId: sub,
                role: userRole,
            });
        }

        const jwtToken = jwt.sign(
            { id: user._id, role: user.role },
            SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token: jwtToken,
            user: {
                role: user.role,
                isProfileComplete: user.isProfileComplete,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Google login failed" });
    }
});

module.exports = router;
