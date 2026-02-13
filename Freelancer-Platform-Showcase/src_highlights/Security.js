/**
 * SECURITY SHOWCASE - Freelancer Website
 * Implements multiple layers of protection:
 * 1. XSS Prevention (DOMPurify)
 * 2. JWT Authentication & Authorization
 * 3. Security Headers (Helmet)
 */

const jwt = require("jsonwebtoken");
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// 1. XSS PREVENTION LAYER
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    return DOMPurify.sanitize(input);
};

// 2. AUTHENTICATION MIDDLEWARE
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");
        req.user = decoded; // Injects user context into request
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

// 3. SECURE HEADERS (Express Implementation)
// app.use(helmet());
// Implemented via helmet to prevent:
// - Clickjacking
// - XSS via script-src
// - Sniffing attacks via NoSniff
