import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../../context/AuthContext";

function Certify() {
  const { token, refreshProfileStatus } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: '',
    description: '',
    skill: 'Web Development',
    experience: 'Beginner',
    language: 'Beginner',
    rate: '',
    location: '',
    country: 'United States',
    phone: '',
    dob: '',
    resume: '',
  });

  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setProfileData((prevData) => ({
        ...prevData,
        resume: file.name,
      }));
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("description", profileData.description);
      formData.append("skills", profileData.skill);
      formData.append("experienceLevel", profileData.experience);
      formData.append("language", profileData.language);
      formData.append("hourlyRate", profileData.rate);
      formData.append("location", profileData.location);
      formData.append("country", profileData.country);
      formData.append("phone", profileData.phone);
      formData.append("dob", profileData.dob);

      if (fileInputRef.current.files[0]) {
        formData.append("resume", fileInputRef.current.files[0]);
      }

      await axios.put(`${import.meta.env.VITE_API_URL}/api/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      });

      await refreshProfileStatus();

      alert("Profile Updated Successfully!");
      navigate("/FLDashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <form
        onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
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
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>

        { }
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Overview</label>
          <textarea
            name="description"
            value={profileData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
            rows="5"
            placeholder="Provide a brief overview of yourself..."
            required
          />
        </div>

        { }
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">What kind of work are you here to do?</label>
          <select
            name="skill"
            value={profileData.skill}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Web Development">Web Development</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Content Writing">Content Writing</option>
            <option value="Digital Marketing">Digital Marketing</option>
          </select>
        </div>

        { }
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Experience</label>
          <select
            name="experience"
            value={profileData.experience}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Beginner">Basic/Beginner level</option>
            <option value="Intermediate">Intermediate level</option>
            <option value="Pro">Pro level</option>
          </select>
        </div>

        { }
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Language (English)</label>
          <select
            name="language"
            value={profileData.language}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Beginner">Basic/Beginner level</option>
            <option value="Intermediate">Intermediate level</option>
            <option value="Pro">Pro level</option>
          </select>
        </div>

        { }
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Rate</label>
          <input
            type="number"
            name="rate"
            value={profileData.rate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Your hourly rate"
            required
          />
        </div>

        { }
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your location"
            required
          />
        </div>

        { }
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Country</label>
          <select
            name="country"
            value={profileData.country}
            onChange={handleChange}
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
          <input
            type="tel"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
            required
          />
        </div>

        { }
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={profileData.dob}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        { }
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">Upload Resume</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={triggerFileSelect}
            className="px-4 py-2 bg-orange-200 text-orange-500 rounded-full focus:ring-2 focus:ring-orange-500"
          >
            Choose File
          </button>
          <span className="ml-4 text-gray-600">{fileName || "No file chosen"}</span>
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

export default Certify;
