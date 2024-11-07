import React from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../../assets/images/profile.svg';
import {Link} from 'react-router-dom';

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

const JobsDash = () => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/JobsListPage'); 
  };

  return (
    <div>
      <section className="mx-8 mt-20">
        <div className="text-3xl py-5 font-bold">Recently Posted Jobs</div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobList.map((job, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-md"
            >
              {/* Job Header */}
              <div className="flex items-center mb-3">
                <div>
                  <p className="text-lg font-semibold">{job.title}</p>
                </div>
                <img
                  src={profile}
                  alt="Profile"
                  className="w-16 h-16 rounded-full ml-auto"
                />
              </div>

              {/* Price & Tags */}
              <div className="text-sm text-gray-700 mb-3">
                <span className="font-bold">{job.price}</span>
              </div>

              <div className="flex flex-wrap mt-2 space-x-2">
                {job.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* View Profile Button */}
              <Link to="/JobDescription">
              <button className="mt-4 border border-orange-500 text-orange-500 font-semibold px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white w-full">
                View Project
              </button>
              </Link>
            </div>
          ))}
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
