import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ClientProfileCreate() {
  const [profileData, setProfileData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    industry: 'Technology',
    description: '',
    location: '',
    country: 'United States',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
        <p className="text-2xl font-semibold text-gray-700 mb-6">Create Client Profile</p>

        {/* Company Name */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={profileData.companyName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your company name"
          />
        </div>

        {/* Contact Person */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Contact Person</label>
          <input
            type="text"
            name="contactPerson"
            value={profileData.contactPerson}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Website */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Website</label>
          <input
            type="text"
            name="website"
            value={profileData.website}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your website"
          />
        </div>

        {/* Industry */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Industry</label>
          <select
            name="industry"
            value={profileData.industry}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {/* Company Overview */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Company Overview</label>
          <textarea
            name="description"
            value={profileData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
            rows="5"
            placeholder="Provide a brief overview of your company..."
          />
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your office location"
          />
        </div>

        {/* Country */}
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

        {/* Save Button */}
        <div className="text-right mt-4">
          <Link to="/ClientDashboard">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-300 focus:ring-2 focus:ring-orange-500">
              Save Profile
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ClientProfileCreate;
