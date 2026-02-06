// ================= IMPORTS =================
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");

// ================= APP SETUP =================
const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "SECRET_KEY";

// Google OAuth Client
const client = new OAuth2Client(
  "878263761108-nnait908lmtn1v4copu10sqv75g9cb85.apps.googleusercontent.com"
);

// ================= DB CONNECTION =================
mongoose
  .connect("mongodb://127.0.0.1:27017/freelancer")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ================= USER MODEL =================
const User = mongoose.model("User", {
  name: String,
  email: { type: String, unique: true },
  password: { type: String, default: null },
  googleId: { type: String, default: null },
  role: {
    type: String,
    enum: ["client", "freelancer", "admin"],
    default: "client",
  },
});

// ================= AUTH MIDDLEWARE =================
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer TOKEN

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ================= ROLE AUTHORIZATION =================
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: wrong role",
      });
    }
    next();
  };
};

// ================= REGISTER =================
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // allow only client or freelancer
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

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Email not found" });

    if (!user.password)
      return res.status(400).json({ message: "Use Google Login" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= GOOGLE LOGIN =================
app.post("/google-login", async (req, res) => {
  try {
    const { token, role } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "878263761108-nnait908lmtn1v4copu10sqv75g9cb85.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const { email, name, sub } = payload;

    let user = await User.findOne({ email });

    if (!user) {
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
      { expiresIn: "1h" }
    );

    res.json({
      token: jwtToken,
      role: user.role,
    });
  } catch (err) {
    res.status(401).json({ message: "Google login failed" });
  }
});

// ================= PROTECTED ROUTES =================

// Client only
app.get(
  "/client/dashboard",
  authMiddleware,
  authorizeRoles("client"),
  (req, res) => {
    res.json({ message: "Welcome Client" });
  }
);

// Freelancer only
app.get(
  "/freelancer/dashboard",
  authMiddleware,
  authorizeRoles("freelancer"),
  (req, res) => {
    res.json({ message: "Welcome Freelancer" });
  }
);

// Admin only
app.get(
  "/admin/dashboard",
  authMiddleware,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

// ================= SERVER =================
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
