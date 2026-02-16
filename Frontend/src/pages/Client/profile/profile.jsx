import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "https://freelancer-website-api.onrender.com";

function ClientProfile() {
  const { token, user, refreshProfileStatus } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "",
    companyName: "",
    contactPerson: "",
    location: "",
    country: "United States",
    phone: "",
    website: "",
    industry: "Technology",
    description: "",
  });

  // Pre-fill name from auth user
  React.useEffect(() => {
    if (user && user.name) {
      setProfileData(prev => ({ ...prev, name: user.name }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    alert("Saving Profile...");
    console.log("Attempting to save profile...");
    console.log("API URL:", API);
    console.log("Profile Data:", profileData);

    try {
      const response = await axios.put(`${API}/api/users/profile`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log("Profile update response:", response.data);
      await refreshProfileStatus();

      alert("Profile Updated Successfully!");
      navigate("/ClientDashboard");
    } catch (err) {
      console.error("Profile update error:", err);
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <form
        onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}
        className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg"
      >
        <p className="text-2xl font-semibold text-gray-700 mb-6">Create Profile</p>

        { }
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Name"
            required
          />
        </div>

        { }
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Contact Person</label>
          <input
            type="text"
            name="contactPerson"
            value={profileData.contactPerson}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter contact person name"
            required
          />
        </div>

        { }
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={profileData.companyName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Company Name"
            required
          />
        </div>

        { }
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Company Location</label>
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Company Address with pincode"
            required
          />
        </div>

        { }
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Country</label>
          <select
            name="country"
            value={profileData.country}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
          </select>
        </div>

        { }
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="flex space-x-4">
            <select className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="+1">🇺🇸 +1 (USA)</option>
              <option value="+44">🇬🇧 +44 (UK)</option>
              <option value="+91">🇮🇳 +91 (India)</option>
              <option value="+61">🇦🇺 +61 (Australia)</option>
            </select>

            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        { }
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Website (Optional)</label>
          <input
            type="url"
            name="website"
            value={profileData.website}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://yourcompany.com"
          />
        </div>

        { }
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Industry</label>
          <select
            name="industry"
            value={profileData.industry}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Retail">Retail</option>
            <option value="Other">Other</option>
          </select>
        </div>

        { }
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Company Description</label>
          <textarea
            name="description"
            value={profileData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Tell us about your company..."
            required
          />
        </div>

        { }
        <div className="text-right mt-4">
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-300 focus:ring-2 focus:ring-orange-500"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClientProfile;
