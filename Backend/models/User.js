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
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    country: { type: String, default: "" },
    description: { type: String, default: "" }, 
    profilePhoto: { type: String, default: "" }, 
    videoUrl: { type: String, default: "" }, 
    companyName: { type: String, default: "" },
    contactPerson: { type: String, default: "" },
    website: { type: String, default: "" },
    industry: { type: String, default: "" },
    experienceLevel: { type: String, default: "" }, 
    language: { type: String, default: "English" },
    dob: { type: Date },
    resume: { type: String, default: "" }, 
    skills: { type: [String], default: [] },
    bio: { type: String, default: "" }, 
    hourlyRate: { type: Number, default: 0 },
    experience: [
        {
            jobTitle: String,
            employer: String,
            duration: String,
            location: String,
            description: String,
        },
    ],
    education: [
        {
            degree: String,
            school: String,
            field: String,
            duration: String,
            graduationYear: Number,
        },
    ],
});

module.exports = mongoose.model("User", userSchema);
