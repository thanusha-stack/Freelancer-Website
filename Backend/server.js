const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();

// CORS Configuration - Security Enhancement
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

const corsOptions = {
  origin: true, // Allow all origins for debugging
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(express.json({ limit: '10mb' })); // Limit payload size for security
app.use(cors(corsOptions));
app.use('/uploads', express.static('uploads'));

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Database Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/freelancer";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/", require("./routes/auth")); // /register, /login
app.use("/api/projects", require("./routes/projects"));
app.use("/api/users", require("./routes/users"));
app.use("/api/applications", require("./routes/applications"));

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
