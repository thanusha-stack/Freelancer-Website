const mongoose = require("mongoose");

const embeddingSchema = new mongoose.Schema({
    docType: {
        type: String,
        enum: ["project", "freelancer", "faq"],
        required: true,
    },
    docId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    text: {
        type: String,
        required: true,
    },
    vector: {
        type: [Number],
        required: true,
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Index for fast lookup by docType and docId
embeddingSchema.index({ docType: 1, docId: 1 });

module.exports = mongoose.model("Embedding", embeddingSchema);
