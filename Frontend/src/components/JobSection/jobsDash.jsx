import React from 'react';
import useFetch from '../../hooks/useFetch';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";



import { useNavigate } from 'react-router-dom';
import profile from '../../assets/images/profile.svg';
import { Link } from 'react-router-dom';



const JobsDash = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: projects, loading } = useFetch("/api/projects?status=Pending");

  const jobList = projects || [];

  const handleViewMore = () => {
    if (!token) {
      navigate("/GetInfo");
    } else {
      navigate('/JobsListPage');
    }
  };

  return (
    <div>
      <section className="mx-8 mt-20">
        <div className="text-3xl py-5 font-bold">Recently Posted Jobs</div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <p>Loading jobs...</p>
          ) : jobList.length === 0 ? (
            <p>No active jobs found.</p>
          ) : (
            jobList.slice(0, 4).map((job, index) => (
              <div
                key={job._id || index}
                className="flex flex-col justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-md"
              >
                {/* Job Header */}
                <div className="flex items-center mb-3">
                  <div>
                    <p className="text-lg font-semibold">{job.name}</p>
                  </div>
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-16 h-16 rounded-full ml-auto"
                  />
                </div>

                {/* Price & Tags */}
                <div className="text-sm text-gray-700 mb-3">
                  <span className="font-bold">
                    {job.budget ? `$${job.budget}` : "Negotiable"}
                  </span>
                </div>

                <div className="flex flex-wrap mt-2 space-x-2">
                  <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded">
                    {job.task}
                  </span>
                </div>

                {/* View Profile Button */}

                <button onClick={() => {
                  if (!token) navigate("/GetInfo");
                  else navigate(`/JobDescription`, { state: { job } }); // Pass job data
                }} className="mt-4 border border-orange-500 text-orange-500 font-semibold px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white w-full">
                  View Project
                </button>

              </div>
            )))}
        </div>
      </section>

      {/* View More Button */}
      <div className="flex justify-center mt-10">
        <button
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-400"
          onClick={handleViewMore}
        >
          View More Jobs
        </button>
      </div>
    </div>
  );
};

export default JobsDash;
