const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const helmet = require("helmet");

const app = express();
app.use(helmet()); 
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], 
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'", "http://localhost:5000", "http://localhost:5173"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);
app.use(express.json({ limit: '10mb' })); 
app.use(cors({
  origin: true, 
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use('/uploads', express.static('uploads'));
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/freelancer";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
app.use("/", require("./routes/auth")); 
app.use("/api/projects", require("./routes/projects"));
app.use("/api/users", require("./routes/users"));
app.use("/api/applications", require("./routes/applications"));
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
