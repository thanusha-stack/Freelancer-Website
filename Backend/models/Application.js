const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    coverLetter: {
        type: String,
        required: true
    },
    proposedRate: {
        type: Number,
        required: true
    },
    estimatedDuration: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
});

// Compound index to prevent duplicate applications
applicationSchema.index({ projectId: 1, freelancerId: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
