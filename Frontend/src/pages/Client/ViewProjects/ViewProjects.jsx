import React, { useEffect, useState } from "react";
import profile from "../../../assets/images/profile.svg";
import NewTask from "../../../assets/images/NewTask.svg";
import { Link } from "react-router-dom";
import data from "./ViewprojectClient.json"; 
import SubHeader from "../SubHeader/SubHeader";

function ClientViewProjects() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [earnings, setEarnings] = useState({});

  useEffect(() => {
    setProjects(data.projects);
    setClients(data.clients);
    setEarnings(data.earnings);
  }, []);

  return (
    <div>
    <SubHeader/>
    <section className="bg-white p-5">
      
      <div className="flex flex-col md:flex-row">
        {/* Left Column */}
        <div className="w-full lg:w-1/2">
          {/* Project Status */}
          <ul className="flex lg:align-center gap-5 md:space-x-12 p-5 overflow-x-auto">
            <li className="border shadow-[0_3px_10px_rgb(0,0,0,0.2)] space-x-7 px-10 py-10 bg-blue-500 text-sm text-white font-bold rounded-lg">
              All Projects ({projects.length})
            </li>
            <li className="border shadow-[0_3px_10px_rgb(0,0,0,0.2)] space-x-7 px-10 py-10 bg-green-500 text-sm text-white font-bold rounded-lg">
              Completed ({projects.filter(p => p.status === "Done").length})
            </li>
            <li className="border shadow-[0_3px_10px_rgb(0,0,0,0.2)] space-x-7 px-10 py-10 bg-orange-500 text-sm text-white font-bold rounded-lg">
              Pending ({projects.filter(p => p.status === "Pending").length})
            </li>
          </ul>

          {/* Project Description Header */}
          <ul className="flex px-10 py-4 justify-between">
            <li className="w-1/3 text-center text-gray-600 font-bold ">Project</li>
            <li className="w-1/3 text-center text-gray-600 font-bold">Task</li>
            <li className="w-1/3 text-center text-gray-600 font-bold">Status</li>
          </ul>

          {/* Projects List */}
          <div className="space-y-3">
  {projects.map((project, index) => (
    <ul
      key={index}
      className="flex px-10 py-4 items-center justify-between border rounded-lg"
    >
      <li className="w-1/3 text-gray-600 truncate font-bold text-center">
        {project.name}
      </li>
      <li className="w-1/3 text-gray-600 truncate text-center">
        {project.task}
      </li>
      <li className="w-1/3 text-gray-600 truncate text-center">
        {project.status}
      </li>
    </ul>
  ))}
</div>


      </div>        
        {/* Right Column */}
        <div className="w-full lg:w-1/2 px-5">
          <div className="flex  flex-col items-center">
            <img src={profile} alt="Profile" className="rounded-full" hight="60" width="60" />
            <div className="text-2xl font-bold mt-2">Alex</div>
            <div className='flex gap-2'><Link to="/ClientProfile">
            <button className="text-orange-500 hover:underline">Edit Profile  </button>
            </Link></div>
          </div>

          {/* Clients Section */}
          <div className="mt-0 mx-16">
            <h3 className="font-bold text-orange-500">Freelancers</h3>
            <div className="border mt-2 px-3 pb-5 rounded-lg">
            <ul className="space-y-2">
              {clients.map((client, index) => (
                <li key={index} className="flex text-gray-500 justify-between mt-8">
                  <span>{client.name}</span>
                  <span>{client.email}</span>
                </li>
              ))}
            </ul>
            </div>
          </div>

          {/* Task */}
          <div className="mt-0 mx-16">
            <h3 className="font-bold text-orange-500">Project</h3>
            <div className="flex flex-col items-center justify-center h-full">
            <div className="border border rounded-lg px-4 py-2 flex flex-col items-center gap-4">
              <img src={NewTask} alt="New Task" />
              <Link to="/FreelancerPage">
              <button className="border rounded-lg px-5 py-1 text-white bg-orange-500 hover:bg-orange-700 transition-all">
                Add a new Project
              </button>
              </Link>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

export default ClientViewProjects;
