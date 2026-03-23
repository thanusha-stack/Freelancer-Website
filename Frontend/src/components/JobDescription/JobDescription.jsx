import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { useLocation, useNavigate } from 'react-router-dom';
import Programmer from "../../assets/images/Programmer.svg";
import { AuthContext } from "../../context/AuthContext";

function JobDescription() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, role } = useContext(AuthContext);

  const [job, setJob] = useState(location.state?.job || null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    proposedRate: '',
    estimatedDuration: '',
    dateOfBirth: '',
    videoIntro: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!job) {
      alert("No job selected. Redirecting...");
      navigate("/JobsListPage");
    }
  }, [job, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!applicationData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required";
    } else if (applicationData.coverLetter.trim().length < 50) {
      newErrors.coverLetter = "Cover letter must be at least 50 characters";
    }

    if (!applicationData.proposedRate) {
      newErrors.proposedRate = "Proposed rate is required";
    } else if (Number(applicationData.proposedRate) <= 0) {
      newErrors.proposedRate = "Rate must be greater than 0";
    }

    if (!applicationData.estimatedDuration.trim()) {
      newErrors.estimatedDuration = "Estimated duration is required";
    }

    if (!applicationData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {

      const dob = new Date(applicationData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      if (age < 18) {
        newErrors.dateOfBirth = "You must be at least 18 years old to apply";
      }
    }

    if (applicationData.videoIntro && !applicationData.videoIntro.startsWith('http')) {
      newErrors.videoIntro = "Please enter a valid URL (starting with http:// or https://)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleApplyNow = () => {
    if (!token) {
      alert("Please login to apply for this job");
      navigate("/Login");
      return;
    }

    if (role !== "freelancer") {
      alert("Only freelancers can apply for jobs");
      return;
    }

    setShowApplicationForm(true);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/applications`,
        {
          projectId: job._id,
          ...applicationData
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Application submitted successfully!");
      setShowApplicationForm(false);
      navigate("/FLDashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return null;
  }

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 py-10"
    >
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold mb-4">{job.name}</h1>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">{job.clientId?.companyName || job.clientId?.name || "Company"}</h2>
            <p className="text-gray-600">{job.task}</p>
          </div>
          {job.budget && (
            <div className="bg-blue-500 text-white rounded-full px-4 py-2">
              <span>${job.budget}</span>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Job Description</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{job.description || "No description provided"}</p>
        </div>

        {job.deadline && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Deadline</h3>
            <p className="text-gray-700">{new Date(job.deadline).toLocaleDateString()}</p>
          </div>
        )}

        <div className='flex gap-10 mb-6'>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Project Details</h3>
            <ul className="list-disc ml-5 text-gray-600">
              <li>Task: {job.task}</li>
              <li>Status: {job.status}</li>
              {job.budget && <li>Budget: ${job.budget}</li>}
            </ul>
          </div>
          <div>
            <img src={Programmer} alt="Programmer" className="w-48" />
          </div>
        </div>

        {!showApplicationForm ? (
          <button
            onClick={handleApplyNow}
            className="bg-orange-500 text-white rounded-lg px-6 py-3 hover:bg-orange-700 transition-all font-semibold"
          >
            Apply Now
          </button>
        ) : (
          <div className="mt-8 border-t pt-6">
            <h3 className="text-2xl font-bold mb-4">Submit Your Application</h3>
            <form onSubmit={handleSubmitApplication} className="space-y-4">
              { }
              <div>
                <label className="block text-lg font-medium mb-2">
                  Cover Letter <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="coverLetter"
                  value={applicationData.coverLetter}
                  onChange={handleInputChange}
                  rows="6"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.coverLetter ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Tell the client why you're the best fit for this project..."
                  required
                />
                {errors.coverLetter && <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>}
              </div>

              { }
              <div>
                <label className="block text-lg font-medium mb-2">
                  Proposed Rate (USD) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="proposedRate"
                  value={applicationData.proposedRate}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.proposedRate ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your proposed rate"
                  min="1"
                  required
                />
                {errors.proposedRate && <p className="text-red-500 text-sm mt-1">{errors.proposedRate}</p>}
              </div>

              { }
              <div>
                <label className="block text-lg font-medium mb-2">
                  Estimated Duration <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="estimatedDuration"
                  value={applicationData.estimatedDuration}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.estimatedDuration ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="e.g., 2 weeks, 1 month"
                  required
                />
                {errors.estimatedDuration && <p className="text-red-500 text-sm mt-1">{errors.estimatedDuration}</p>}
              </div>

              { }
              <div>
                <label className="block text-lg font-medium mb-2">
                  Video Introduction URL <span className="text-sm text-gray-500">(Optional - e.g. YouTube/Drive link)</span>
                </label>
                <input
                  type="url"
                  name="videoIntro"
                  value={applicationData.videoIntro}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.videoIntro ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Paste your link here..."
                />
                {errors.videoIntro && <p className="text-red-500 text-sm mt-1">{errors.videoIntro}</p>}
              </div>

              { }
              <div>
                <label className="block text-lg font-medium mb-2">
                  Date of Birth <span className="text-red-500">*</span> <span className="text-sm text-gray-500">(Must be 18+)</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={applicationData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                  required
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-orange-500 text-white rounded-lg px-6 py-3 hover:bg-orange-700 transition-all font-semibold disabled:bg-gray-400"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="bg-gray-300 text-gray-700 rounded-lg px-6 py-3 hover:bg-gray-400 transition-all font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default JobDescription;
