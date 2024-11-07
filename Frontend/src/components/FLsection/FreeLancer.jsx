import React from 'react';
import FreelancerCard from "./FLsection";
import { useNavigate } from "react-router-dom";

const freelancers = [
  {
    name: 'Akshay L.',
    role: 'Senior GIS Developer || Remote Sensing ||...',
    hourlyRate: 30,
    jobSuccess: 100,
    tags: ['Geolocation', 'Geospatial Data', 'Remote Sensing', 'GIS', '8 more'],
    image: 'https://via.placeholder.com/80',
  },
  {
    name: 'Priya S.',
    role: 'Full-Stack Developer || React & Node.js Expert',
    hourlyRate: 45,
    jobSuccess: 98,
    tags: ['JavaScript', 'React', 'Node.js', 'MongoDB', '3 more'],
    image: 'https://via.placeholder.com/80',
  },
  {
    name: 'Akshay L.',
    role: 'Senior GIS Developer || Remote Sensing ||...',
    hourlyRate: 30,
    jobSuccess: 100,
    tags: ['Geolocation', 'Geospatial Data', 'Remote Sensing', 'GIS', '8 more'],
    image: 'https://via.placeholder.com/80',
  },
  {
    name: 'Priya S.',
    role: 'Full-Stack Developer || React & Node.js Expert',
    hourlyRate: 45,
    jobSuccess: 98,
    tags: ['JavaScript', 'React', 'Node.js', 'MongoDB', '3 more'],
    image: 'https://via.placeholder.com/80',
  },
];

const FreelancerSection = () => {
  const navigate = useNavigate(); // Hook must be inside the component

  const handleSubmit = () => {
    navigate("/FreelancerPage");
  };

  return (
    <section className="mx-10 mt-10">
      <div className="text-3xl py-5">Explore Top Freelancers</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {freelancers.map((freelancer, index) => (
          <FreelancerCard key={index} {...freelancer} />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit} // Corrected 'onClick'
          className="px-6 py-3 bg-orange-500 text-white mt-4 rounded-lg hover:bg-orange-400"
        >
          View More Freelancers &gt;
        </button>
      </div>
    </section>
  );
};

export default FreelancerSection;
