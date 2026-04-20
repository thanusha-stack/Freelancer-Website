const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    task: { type: String, required: true }, 
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Done"],
        default: "Pending",
    },
    action: { type: String, default: "Play" }, 
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    budget: { type: String },
    deadline: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

projectSchema.index({ task: 1, status: 1 });
projectSchema.index({ clientId: 1, status: 1 });

module.exports = mongoose.model("Project", projectSchema);
