import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "https://freelancer-website-api.onrender.com";

const ClientProfileNew = () => {
    const { token, user, refreshProfileStatus } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        companyName: "",
        contactPerson: "",
        location: "",
        country: "India",
        phone: "",
        website: "",
        industry: "Technology",
        description: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        console.log("New Profile Component Mounted. User:", user);
        if (user?.name) {
            setFormData(prev => ({ ...prev, name: user.name }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final Diagnostic Check
        alert(`Step 1: Preparing to Save Profile\nName: ${formData.name}\nTarget: ${API}`);

        if (!token) {
            alert("Error: Missing Security Token. Please Login again.");
            return;
        }

        setIsSubmitting(true);

        try {
            alert("Step 2: Sending data to Server...");
            const response = await axios.put(`${API}/api/users/profile`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            alert("Step 3: Server accepted the data! Updating Local Status...");
            await refreshProfileStatus();

            alert("Success! Profile Created Successfully.");
            navigate("/ClientDashboard");
        } catch (err) {
            console.error("Submission Error:", err);
            const msg = err.response?.data?.message || err.message || "Connection Failed";
            alert(`Step 4: FAILED\nReason: ${msg}\n\nPlease check your internet and try again.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-400 to-orange-600 px-8 py-10 text-white">
                        <h1 className="text-3xl font-bold">Complete Your Client Profile</h1>
                        <p className="mt-2 text-orange-50 opacity-90">Tell us about your company to start hiring top freelancers.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Name */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                    placeholder="e.g. John Doe"
                                />
                            </div>

                            {/* Contact Person */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Contact Person</label>
                                <input
                                    required
                                    type="text"
                                    name="contactPerson"
                                    value={formData.contactPerson}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                    placeholder="Primary contact"
                                />
                            </div>

                            {/* Company Name */}
                            <div className="col-span-full space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Company Name</label>
                                <input
                                    required
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                    placeholder="Scale Up Inc."
                                />
                            </div>

                            {/* Location */}
                            <div className="col-span-full space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Company Location</label>
                                <input
                                    required
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                    placeholder="City, State, Country"
                                />
                            </div>

                            {/* Country */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Country</label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none appearance-none bg-white"
                                >
                                    <option value="India">India</option>
                                    <option value="United States">United States</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Australia">Australia</option>
                                </select>
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

                            {/* Website */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Website (Optional)</label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                    placeholder="https://company.com"
                                />
                            </div>

                            {/* Industry */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Industry</label>
                                <select
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none appearance-none bg-white"
                                >
                                    <option value="Technology">Technology</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Education">Education</option>
                                    <option value="Creative">Creative Services</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700">Company Description</label>
                            <textarea
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none resize-none"
                                placeholder="Tell us what your company does..."
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-orange-500/30 transition-all ${isSubmitting
                                        ? "bg-slate-400 cursor-not-allowed"
                                        : "bg-orange-500 hover:bg-orange-600 hover:-translate-y-0.5"
                                    }`}
                            >
                                {isSubmitting ? "Processing..." : "Create Profile"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ClientProfileNew;
