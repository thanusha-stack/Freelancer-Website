
import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

const FreelancerCard = ({ id, name, role, hourlyRate, jobSuccess, tags, image }) => (
  <div className="flex flex-col justify-between p-5 bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
    <div className="flex w-full items-center">
      <div>
        <p className="text-xl font-bold text-gray-800">{name}</p>
        <p className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-md inline-block mt-1">{role}</p>
      </div>
      <img src={image} alt={`${name} Profile`} className="ml-auto w-16 h-16 rounded-full border-2 border-indigo-100 shadow-sm object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>

    <div className="flex items-center text-sm mt-4">
      <span className="font-extrabold text-gray-800">${hourlyRate}<span className="text-gray-400 font-medium text-xs">/hr</span></span>
    </div>

    <div className="flex flex-wrap mt-3 gap-2">
      {tags.map((tag, index) => (
        <span key={index} className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-indigo-100/50">
          {tag}
        </span>
      ))}
    </div>
      <Link to={id ? `/FLViewProfile/${id}` : "/FLViewProfile"} className="mt-5 w-full block">
    <button className="w-full bg-white border-2 border-indigo-600 text-indigo-600 font-bold px-4 py-2.5 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors duration-300 shadow-sm hover:shadow active:scale-95">
      View Profile
    </button>
    </Link>
  </div>
);

export default FreelancerCard;
