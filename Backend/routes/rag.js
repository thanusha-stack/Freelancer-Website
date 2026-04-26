const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { ragChat, ingestDocuments } = require("../services/ragService");

// POST /api/rag/chat - Ask HireBot a question (authenticated users)
router.post("/chat", authMiddleware, async (req, res) => {
    try {
        const { query } = req.body;

        if (!query || typeof query !== "string" || query.trim().length === 0) {
            return res.status(400).json({ message: "Query is required" });
        }

        if (query.trim().length > 500) {
            return res.status(400).json({ message: "Query too long (max 500 characters)" });
        }

        const userRole = req.user.role || "client";
        const result = await ragChat(query.trim(), userRole);

        res.json(result);
    } catch (err) {
        console.error("RAG chat error:", err);
        res.status(500).json({
            message: "HireBot encountered an error. Please try again.",
            error: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
});

// POST /api/rag/ingest - Re-embed all platform data (admin only)
router.post("/ingest", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admin access required" });
        }

        // Run ingestion in background, respond immediately
        res.json({ message: "Ingestion started. Check server logs for progress." });

        ingestDocuments()
            .then(results => console.log("✅ Ingestion finished:", results))
            .catch(err => console.error("❌ Ingestion failed:", err));

    } catch (err) {
        console.error("Ingest error:", err);
        res.status(500).json({ message: "Ingestion failed to start." });
    }
});

// POST /api/rag/ingest-sync - Re-embed and wait for completion (admin only)
router.post("/ingest-sync", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admin access required" });
        }

        const results = await ingestDocuments();
        res.json({ message: "Ingestion complete", results });
    } catch (err) {
        console.error("Ingest-sync error:", err);
        res.status(500).json({ message: "Ingestion failed.", error: err.message });
    }
});

module.exports = router;
