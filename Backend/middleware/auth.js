const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "SECRET_KEY";

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

module.exports = authMiddleware;
