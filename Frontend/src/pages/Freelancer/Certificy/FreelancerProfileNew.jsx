import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "https://freelancer-website-api.onrender.com";

const FreelancerProfileNew = () => {
    const { token, user, refreshProfileStatus } = useContext(AuthContext);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        videoUrl: "",
        skill: "Web Development",
        experienceLevel: "Beginner",
        language: "Beginner",
        rate: "",
        location: "",
        country: "India",
        phone: "",
        dob: "",
        // Work History (single entry for simplification)
        jobTitle: "",
        employer: "",
        workDuration: "",
        workDescription: "",
        // Education
        degree: "",
        school: "",
        field: "",
        eduDuration: "",
        graduationYear: "",
    });


    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user?.name) {
            setFormData(prev => ({ ...prev, name: user.name }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        alert(`Step 1: Preparing to Save Freelancer Profile\nName: ${formData.name}\nTarget: ${API}`);

        if (!token) {
            alert("Error: Missing Security Token. Please Login again.");
            return;
        }

        setIsSubmitting(true);

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("bio", formData.bio);
            data.append("videoUrl", formData.videoUrl);
            data.append("skills", formData.skill);
            data.append("experienceLevel", formData.experienceLevel);
            data.append("language", formData.language);
            data.append("hourlyRate", formData.rate);
            data.append("location", formData.location);
            data.append("country", formData.country);
            data.append("phone", formData.phone);
            data.append("dob", formData.dob);

            // Construct experience and education arrays
            const experience = [{
                jobTitle: formData.jobTitle,
                employer: formData.employer,
                duration: formData.workDuration, // Note: model has duration and location added
                description: formData.workDescription,
                location: formData.location // Reuse city
            }];
            const education = [{
                degree: formData.degree,
                school: formData.school,
                field: formData.field,
                duration: formData.eduDuration,
                graduationYear: Number(formData.graduationYear) || undefined
            }];

            data.append("experience", JSON.stringify(experience));
            data.append("education", JSON.stringify(education));

            if (selectedFile) {
                data.append("resume", selectedFile);

                alert(`Step 2: Including Resume: ${selectedFile.name}`);
            } else {
                alert("Step 2: No Resume selected. Proceeding anyway...");
            }

            alert("Step 3: Sending data to Server...");
            const response = await axios.put(`${API}/api/users/profile`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            });

            alert("Step 4: Server accepted the data! Updating Local Status...");
            await refreshProfileStatus();

            alert("Success! Freelancer Profile Created Successfully.");
            navigate("/FLDashboard");
        } catch (err) {
            console.error("Submission Error:", err);
            const msg = err.response?.data?.message || err.message || "Connection Failed";
            alert(`Step 5: FAILED\nReason: ${msg}\n\nPlease check your internet and try again.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-700 px-8 py-10 text-white">
                        <h1 className="text-3xl font-bold">Launch Your Freelancer Career</h1>
                        <p className="mt-2 text-orange-50 opacity-90">Set up your professional profile to start winning high-paying projects.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Personal Details Section */}
                            <div className="col-span-full pb-2 border-b border-slate-100 mb-2">
                                <h3 className="text-lg font-bold text-slate-800">1. Personal Information</h3>
                            </div>

                            {/* Full Name */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                    placeholder="+91 XXXXX XXXXX"
                                />
                            </div>

                            {/* DOB */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Date of Birth</label>
                                <input
                                    required
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                />
                            </div>

                            {/* Professional Details Section */}
                            <div className="col-span-full pb-2 border-b border-slate-100 mt-4 mb-2">
                                <h3 className="text-lg font-bold text-slate-800">2. Professional Profile</h3>
                            </div>

                            {/* Skill Category */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Primary Skill</label>
                                <select
                                    name="skill"
                                    value={formData.skill}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none appearance-none bg-white"
                                >
                                    <option value="Web Development">Web Development</option>
                                    <option value="Graphic Design">Graphic Design</option>
                                    <option value="Content Writing">Content Writing</option>
                                    <option value="Digital Marketing">Digital Marketing</option>
                                </select>
                            </div>

                            {/* Hourly Rate */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Hourly Rate ($)</label>
                                <input
                                    required
                                    type="number"
                                    name="rate"
                                    value={formData.rate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                    placeholder="25"
                                />
                            </div>

                            {/* Experience */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Experience Level</label>
                                <select
                                    name="experienceLevel"
                                    value={formData.experienceLevel}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none appearance-none bg-white font-sans"
                                >
                                    <option value="Beginner">Basic / Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Pro">Pro / Expert</option>
                                </select>
                            </div>

                            {/* Language */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">English Proficiency</label>
                                <select
                                    name="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none appearance-none bg-white font-sans"
                                >
                                    <option value="Beginner">Basic / Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Pro">Pro / Fluent</option>
                                </select>
                            </div>

                            {/* Location & Resume Section */}
                            <div className="col-span-full pb-2 border-b border-slate-100 mt-4 mb-2">
                                <h3 className="text-lg font-bold text-slate-800">3. Location & Resume</h3>
                            </div>

                            {/* Location */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">City / Town</label>
                                <input
                                    required
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                    placeholder="e.g. Mumbai"
                                />
                            </div>

                            {/* Country */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Country</label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none appearance-none bg-white font-sans"
                                >
                                    <option value="India">India</option>
                                    <option value="United States">United States</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Australia">Australia</option>
                                </select>
                            </div>

                            {/* Resume Upload */}
                            <div className="col-span-full space-y-3">
                                <label className="text-sm font-semibold text-slate-700">Upload Your Resume (PDF preferred)</label>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current.click()}
                                        className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Choose File
                                    </button>
                                    <span className="text-sm text-slate-500 truncate max-w-[200px]">
                                        {selectedFile ? selectedFile.name : "No file selected"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Professional Summary */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700">Professional Summary</label>
                            <textarea
                                required
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none resize-none font-sans"
                                placeholder="Briefly describe your professional background and key strengths..."
                            />
                        </div>

                        {/* Video URL */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700">Profile Video URL (Optional)</label>
                            <input
                                type="url"
                                name="videoUrl"
                                value={formData.videoUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                placeholder="https://youtube.com/watch?v=... or direct mp4 link"
                            />
                        </div>

                        {/* Work History Section */}
                        <div className="pt-4">
                            <div className="col-span-full pb-2 border-b border-slate-100 mb-4">
                                <h3 className="text-lg font-bold text-slate-800">4. Work History</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-slate-700">Recent Job Title</label>
                                    <input
                                        type="text"
                                        name="jobTitle"
                                        value={formData.jobTitle}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                        placeholder="e.g. Senior Web Developer"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-slate-700">Employer / Company</label>
                                    <input
                                        type="text"
                                        name="employer"
                                        value={formData.employer}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                        placeholder="e.g. Tech Solutions Inc."
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-slate-700">Duration</label>
                                    <input
                                        type="text"
                                        name="workDuration"
                                        value={formData.workDuration}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                        placeholder="e.g. Jan 2021 - Present"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-slate-700">Brief Description</label>
                                    <input
                                        type="text"
                                        name="workDescription"
                                        value={formData.workDescription}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                        placeholder="Briefly describe your role"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Education Section */}
                        <div className="pt-4">
                            <div className="col-span-full pb-2 border-b border-slate-100 mb-4">
                                <h3 className="text-lg font-bold text-slate-800">5. Education</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-slate-700">Degree</label>
                                    <input
                                        type="text"
                                        name="degree"
                                        value={formData.degree}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                        placeholder="e.g. Bachelor of Technology"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-slate-700">Field of Study</label>
                                    <input
                                        type="text"
                                        name="field"
                                        value={formData.field}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                        placeholder="e.g. Computer Science"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-slate-700">School / University</label>
                                    <input
                                        type="text"
                                        name="school"
                                        value={formData.school}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                        placeholder="e.g. Stanford University"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-slate-700">Graduation Year</label>
                                    <input
                                        type="number"
                                        name="graduationYear"
                                        value={formData.graduationYear}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                        placeholder="e.g. 2022"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-slate-700">Duration / Year</label>
                                    <input
                                        type="text"
                                        name="eduDuration"
                                        value={formData.eduDuration}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                        placeholder="e.g. 2018 - 2022"
                                    />
                                </div>
                            </div>
                        </div>


                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className={`w-full py-5 rounded-2xl text-white font-bold text-xl shadow-lg shadow-orange-500/30 transition-all ${isSubmitting
                                        ? "bg-slate-400 cursor-not-allowed"
                                        : "bg-orange-500 hover:bg-orange-600 hover:-translate-y-1 active:scale-95"
                                    }`}
                            >
                                {isSubmitting ? "Finalizing Your Profile..." : "Complete Profile & Start Earning"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FreelancerProfileNew;
