const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/auth");

// GET /api/notifications - Get all notifications for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
    try {
        const notifications = await Notification.find({ recipientId: req.user.id })
            .populate("senderId", "name email profilePhoto")
            .populate("projectId", "name task")
            .populate("applicationId", "status proposedRate estimatedDuration coverLetter")
            .sort({ createdAt: -1 });

        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/notifications/unread-count - Get count of unread notifications
router.get("/unread-count", authMiddleware, async (req, res) => {
    try {
        const count = await Notification.countDocuments({
            recipientId: req.user.id,
            isRead: false
        });
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH /api/notifications/read-all - Mark all notifications as read
router.patch("/read-all", authMiddleware, async (req, res) => {
    try {
        await Notification.updateMany(
            { recipientId: req.user.id, isRead: false },
            { $set: { isRead: true } }
        );
        res.json({ message: "All notifications marked as read" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH /api/notifications/:id/read - Mark a single notification as read
router.patch("/:id/read", authMiddleware, async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.id, recipientId: req.user.id },
            { $set: { isRead: true } },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.json(notification);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
