/**
 * UI LOGIC SHOWCASE - Freelancer Website
 * Demonstration of dynamic data fetching, global state integration, and navigation logic.
 */

import React from 'react';
import useFetch from '../../hooks/useFetch';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const JobsDash = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    // Custom Hook for optimized data fetching
    const { data: projects, loading } = useFetch("/api/projects/browse");

    const handleViewMore = () => {
        // Protected navigation logic
        if (!token) {
            navigate("/GetInfo");
        } else {
            navigate('/JobsListPage');
        }
    };

    return (
        <section className="mx-8 mt-20">
            <h2 className="text-3xl font-bold mb-5">Recently Posted Jobs</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    <p>Loading projects...</p>
                ) : (
                    projects?.slice(0, 4).map((job) => (
                        <div key={job._id} className="p-4 bg-white border rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">{job.name}</h3>
                            <p className="font-bold text-indigo-600">
                                {job.budget ? `$${job.budget}` : "Negotiable"}
                            </p>
                            <button
                                onClick={() => navigate(`/JobDescription`, { state: { job } })}
                                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                            >
                                View Details
                            </button>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default JobsDash;
