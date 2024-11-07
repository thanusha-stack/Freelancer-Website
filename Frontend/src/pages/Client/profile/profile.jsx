import React, { useRef, useState } from "react";
import Profile from "../../Freelancer/Certificy/profile/Profile";
import { Link } from "react-router-dom";

function ClientProfile() {
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState({
    name: "",
    companyName: "",
    emailID: "",
    location: "",
    country: "United States",
    phone: "",
    otp: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData((prevData) => ({
        ...prevData,
        profilePicture: file.name, // Or save the actual file if needed
      }));
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleSaveProfile = () => {
    console.log("Profile Data:", profileData);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
        <p className="text-2xl font-semibold text-gray-700 mb-6">Create Profile</p>

        <div className="mb-6">
          <Profile />
          <p className="text-center text-gray-500">Click Logo to upload your profile</p>
        </div>

        {/* Name */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Name"
          />
        </div>

        {/* EmailID */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Email ID</label>
          <input
            type="text"
            name="email"
            value={profileData.emailID}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Email ID"
          />
        </div>


        {/* Company Name */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={profileData.companyName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Company Name"
          />
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Company Location</label>
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Company Address with pincode"
          />
        </div>

        {/* Country Selector */}
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

        {/* Phone Number */}
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
            />
          </div>
        </div>

        {/* OTP */}
        <div className="flex w-1/4 space-x-4 mb-5">
          <input
            type="text"
            name="otp"
            value={profileData.otp}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter OTP"
          />
        </div>

        <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

        {/* Save Button */}
        <div className="text-right mt-4">
          <Link to="/ClientDashboard">
          <button
            onClick={handleSaveProfile}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-300 focus:ring-2 focus:ring-orange-500"
          >
            Save Profile
          </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ClientProfile;
