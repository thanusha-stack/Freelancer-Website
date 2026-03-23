import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import FreelancerCard from "./FLsection";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const FreelancerSection = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/users?role=freelancer`;
        const response = await axios.get(apiUrl);
        const mappedFreelancers = response.data.map(user => ({
          name: user.name,
          role: user.bio || "Freelancer",
          hourlyRate: user.hourlyRate || 0,
          jobSuccess: 95, 
          tags: user.skills || [],
          image: user.profilePhoto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&size=200&background=random',
          id: user._id,
        }));
        setFreelancers(mappedFreelancers);
        setLoading(false);
      } catch (err) {
        setError("Failed to load freelancers");
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  const handleSubmit = () => {
    if (!token) {
      navigate("/GetInfo");
    } else {
      navigate("/FreelancerPage");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <section className="mx-10 mt-10">
      <div className="text-3xl py-5">Explore Top Freelancers</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {freelancers.length > 0 ? (
          freelancers.slice(0, 4).map((freelancer, index) => (
            <FreelancerCard key={index} {...freelancer} />
          ))
        ) : (
          <p>No freelancers found.</p>
        )}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit} 
          className="px-6 py-3 bg-orange-500 text-white mt-4 rounded-lg hover:bg-orange-400"
        >
          View More Freelancers &gt;
        </button>
      </div>
    </section>
  );
};

export default FreelancerSection;
