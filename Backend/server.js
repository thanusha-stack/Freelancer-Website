const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const helmet = require("helmet");

const app = express();

app.use(compression());
app.use(helmet({
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
}));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'", "http://localhost:5000", "https://hireelite.onrender.com", "http://localhost:5173"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// CORS Configuration - Security Enhancement

// Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: { message: "Too many requests from this IP, please try again after 15 minutes" },
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(cors({
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use('/uploads', express.static('uploads'));

// Database Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/freelancer";

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    // Auto-seed RAG knowledge base on startup
    try {
      const { ingestDocuments } = require("./services/ragService");
      ingestDocuments()
        .then(r => console.log("✅ HireBot knowledge base ready:", r))
        .catch(e => console.warn("⚠️  RAG ingestion failed (non-fatal):", e.message));
    } catch (e) {
      console.warn("⚠️  RAG service unavailable:", e.message);
    }
  })
  .catch((err) => console.log(err));

// Routes
app.use("/", require("./routes/auth")); // /register, /login
app.use("/api/projects", require("./routes/projects"));
app.use("/api/users", require("./routes/users"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/rag", require("./routes/rag")); // RAG AI assistant

// Basic Route for testing
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
