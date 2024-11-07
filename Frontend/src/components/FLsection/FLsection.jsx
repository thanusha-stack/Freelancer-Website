// FreelancerCard.js
import React from 'react';
import {Link} from 'react-router-dom';

const FreelancerCard = ({ name, role, hourlyRate, jobSuccess, tags, image }) => (
  <div className="flex flex-col justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-md">
    <div className="flex w-full items-center">
      <div>
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-base font-medium text-gray-600">{role}</p>
      </div>
      <img src={image} alt={`${name} Profile`} className="ml-auto w-16 h-16 rounded-full" />
    </div>

    <div className="flextext-sm mt-2">
      <span className="font-bold">${hourlyRate}/hr</span>
      <span className="text-orange-500 flex ">
      </span>
    </div>

    <div className="flex flex-wrap mt-3 space-x-2">
      {tags.map((tag, index) => (
        <span key={index} className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded">
          {tag}
        </span>
      ))}
    </div>
      <Link to="/FLViewProfile">
    <button className="mt-4 border border-orange-500 text-orange-500 font-semibold px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white">
      View Profile
    </button>
    </Link>
  </div>
);

export default FreelancerCard;
