import React from 'react';
import { Link } from 'react-router-dom';

const ClientRoleBox = ({ icon, description }) => (
  <div 
    className="border-2 border-gray-300 rounded-lg p-6 w-64 text-center cursor-pointer 
               hover:border-orange-500 transition-all"
  >
    <div className="flex justify-between items-center">
      <span className="text-3xl">{icon}</span>
    </div>
    <p className="mt-4 text-lg font-medium">{description}</p>

    <button 
      className="bg-white border border-orange-500 text-orange-500 mt-4 py-1 px-6 rounded-lg 
                 hover:bg-orange-500 hover:text-white transition-all"
    >
      <Link to={`/Login?role=client`}>Join</Link>
    </button>
  </div>
);

const FLRoleBox = ({ icon, description }) => (
  <div 
    className="border-2 border-gray-300 rounded-lg p-6 w-64 text-center cursor-pointer 
               hover:border-orange-500 transition-all"
  >
    <div className="flex justify-between items-center">
      <span className="text-3xl">{icon}</span>
    </div>
    <p className="mt-4 text-lg font-medium">{description}</p>

    <button 
      className="bg-white border border-orange-500 text-orange-500 mt-4 py-1 px-6 rounded-lg 
                 hover:bg-orange-500 hover:text-white transition-all"
    >
      <Link to={`/Login?role=freelancer`}>Join</Link>
    </button>
  </div>
);

const GetInfo = () => {
  return (
    <div>
      <section>
        <div className="flex flex-col items-center mx-auto justify-center min-h-screen space-y-8">
          <h1 className="text-2xl font-semibold text-center">
            Join as a client or freelancer
          </h1>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <ClientRoleBox 
              icon="👤"
              description="I'm a client, hiring for a project" 
            />
            <FLRoleBox 
              icon="💻"
              description="I'm a freelancer, looking for work" 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInfo;
