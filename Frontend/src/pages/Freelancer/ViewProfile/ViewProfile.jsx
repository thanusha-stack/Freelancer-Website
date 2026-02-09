import React from 'react';
import useFetch from '../../../hooks/useFetch';

const ProfileCard = () => {
  const { data: user, loading } = useFetch("/api/users/me");

  const profileData = user ? {
    image: "https://via.placeholder.com/150", // Static for now
    name: user.name,
    location: "Remote", // Schema doesn't have location yet
    email: user.email,
    phone: "N/A",
    rating: 5,
    rate: user.hourlyRate ? `$${user.hourlyRate}/hr` : "Negotiable",
    summary: user.bio || "No summary provided.",
    workHistory: user.experience?.[0] || {}, // Just showing first one for now matching UI structure
    education: user.education?.[0] || {},
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4"
  } : null;

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto p-8 bg-white shadow-lg rounded-lg flex">
      {/* Left Section - Static */}
      <div className="w-1/3 pr-6 sticky top-8 h-screen">
        <img
          src={profileData.image}
          alt="Profile"
          className="rounded-full w-32 h-32 mx-auto"
        />
        <h2 className="text-center text-xl font-bold mt-4">{profileData.name}</h2>
        <p className="text-center text-gray-600">{profileData.location}</p>
        <div className="mt-4 space-y-2">
          <p className="text-gray-600">
            <strong>Email:</strong> {profileData.email}
          </p>
          <p className="text-gray-600">
            <strong>Phone:</strong> {profileData.phone}
          </p>
        </div>

        <div className="mt-6 flex flex-col ">
          <a href="#" className="text-blue-600 hover:underline">See Resume</a>
          <a href="#" className="text-blue-600 hover:underline">See LinkedIn Profile</a>
          <a href="#" className="text-blue-600 hover:underline">See Portfolio</a>
          <a href="#" className="text-blue-600 hover:underline">See Previous Projects</a>
        </div>
        <div className="mt-6">
          <p className="text-gray-600">
            <strong>Overall Rating:</strong> {"⭐".repeat(profileData.rating)}
          </p>
          <p className="text-gray-600">
            <strong>Rate:</strong> {profileData.rate}
          </p>
        </div>
        <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg">
          Invite
        </button>
      </div>

      {/* Right Section - Scrollable */}
      <div className="w-2/3 pl-6 overflow-y-auto">
        <h3 className="text-2xl font-bold text-orange-500 mb-4">
          Professional Summary
        </h3>
        <p className="text-gray-700">
          {profileData.summary}
        </p>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <h4 className="text-xl font-bold mb-2">Work History</h4>
            <p><strong>Job Title:</strong> {profileData.workHistory.jobTitle}</p>
            <p><strong>Position:</strong> {profileData.workHistory.position}</p>
            <p><strong>Employer:</strong> {profileData.workHistory.employer}</p>
            <p><strong>Location:</strong> {profileData.workHistory.location}</p>
            <p><strong>Duration:</strong> {profileData.workHistory.duration}</p>
            <p>{profileData.workHistory.description}</p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-2">Education</h4>
            <p><strong>Degree:</strong> {profileData.education.degree}</p>
            <p><strong>Field:</strong> {profileData.education.field}</p>
            <p><strong>Duration:</strong> {profileData.education.duration}</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-xl font-bold mb-2">Applicant Video</h4>
          <video
            controls
            className="w-full h-auto rounded-lg shadow-md"
          >
            <source src={profileData.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

      </div>
    </div>
  );
};

export default ProfileCard;
