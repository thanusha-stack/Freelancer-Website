import React from 'react';
import profile from '../../../assets/images/profile.svg';
import { Link } from "react-router-dom";

const jobList = [
  {
    title: 'Prompt Engineer for AI Character Development',
    price: 'Fixed price - $30/hr',
    tags: ['Geolocation', 'Geospatial Data', 'Remote Sensing', 'GIS', '8 more'],
  },
  {
    title: 'Full-Stack Developer for React/Node.js Projects',
    price: 'Fixed price - $45/hr',
    tags: ['JavaScript', 'React', 'Node.js', 'MongoDB', '3 more'],
  },
  {
    title: 'UX Designer for Mobile App Prototypes',
    price: 'Fixed price - $35/hr',
    tags: ['UX Design', 'Figma', 'Wireframing', 'Prototyping'],
  },
  {
    title: 'Data Analyst - Python & SQL Expert Needed',
    price: 'Fixed price - $40/hr',
    tags: ['Python', 'SQL', 'Power BI', 'Data Visualization'],
  },
];

function JobsCard({ name, budget, task, description, _id }) {
  return (
    <div className="flex flex-col justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-md h-full">
      {}
      <div className="flex items-center mb-3">
        <div>
          <p className="text-lg font-semibold">{name}</p>
        </div>
        <img
          src={profile}
          alt="Profile"
          className="w-16 h-16 rounded-full ml-auto"
        />
      </div>

      {}
      <div className="text-sm text-gray-700 mb-3">
        <span className="font-bold">{budget ? `$${budget}` : "Negotiable"}</span>
      </div>

      <div className="flex flex-wrap mt-2 space-x-2">
        <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded">
          {task}
        </span>
      </div>

      {}
      <Link to="/JobDescription" state={{ job: { name, budget, task, description, _id } }}>
        <button className="mt-4 border border-orange-500 text-orange-500 font-semibold px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white w-full">
          View Project
        </button>
      </Link>
    </div>
  );
}

export default JobsCard;
