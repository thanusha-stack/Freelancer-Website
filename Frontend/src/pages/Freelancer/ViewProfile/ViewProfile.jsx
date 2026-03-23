import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';

const ProfileCard = () => {
  const { id } = useParams();
  const fetchUrl = id ? `/api/users/${id}` : "/api/users/me";
  const { data: user, loading, error } = useFetch(fetchUrl);
  console.log("ViewProfile loading:", loading, "error:", error, "user:", user);

  const profileData = user ? {
    image: "https://via.placeholder.com/150",
    name: user.name,
    location: "Remote",
    email: user.email,
    phone: "N/A",
    rating: 5,
    rate: user.hourlyRate ? `$${user.hourlyRate}/hr` : "Negotiable",
    summary: user.bio || "No summary provided.",
    workHistory: user.experience?.[0] || {},
    education: user.education?.[0] || {},
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4"
  } : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        <p className="ml-4 text-gray-600 font-medium">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Profile</h2>
        <p className="text-gray-700 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Profile Not Found</h2>
        <p className="text-gray-600">The requested freelancer profile could not be found.</p>
      </div>
    );
  }


  return (
    <div className="mx-auto p-8 bg-white shadow-lg rounded-lg flex">
      { }
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

      { }
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
