const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["application_received", "project_assigned", "application_rejected"],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application"
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

notificationSchema.index({ recipientId: 1, createdAt: -1 });

module.exports = mongoose.model("Notification", notificationSchema);
