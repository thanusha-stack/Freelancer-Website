const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, default: null },
    googleId: { type: String, default: null },
    role: {
        type: String,
        enum: ["client", "freelancer", "admin"],
        default: "client",
    },
    isProfileComplete: {
        type: Boolean,
        default: false,
    },
    // Generic Profile Fields
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    country: { type: String, default: "" },
    description: { type: String, default: "" }, // Overview/Bio
    profilePhoto: { type: String, default: "" }, // Profile photo URL

    // Client Specific
    companyName: { type: String, default: "" },
    contactPerson: { type: String, default: "" },
    website: { type: String, default: "" },
    industry: { type: String, default: "" },

    // Freelancer Specific
    experienceLevel: { type: String, default: "" }, // Beginner, Intermediate, Pro
    language: { type: String, default: "English" },
    dob: { type: Date },
    resume: { type: String, default: "" }, // Filename or URL

    // Existing fields
    skills: { type: [String], default: [] },
    bio: { type: String, default: "" }, // Keeping backward compatibility if used
    hourlyRate: { type: Number, default: 0 },
    experience: [
        {
            jobTitle: String,
            employer: String,
            startDate: Date,
            endDate: Date,
            description: String,
        },
    ],
    education: [
        {
            degree: String,
            school: String,
            field: String,
            graduationYear: Number,
        },
    ],
});

module.exports = mongoose.model("User", userSchema);
