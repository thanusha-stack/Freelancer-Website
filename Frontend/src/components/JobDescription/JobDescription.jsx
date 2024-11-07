import React from 'react';
import bg from "../../assets/images/bg.jpg";
import Programmer from "../../assets/images/Programmer.svg";

const jobData = {
  title: "Frontend Developer",
  company: "Tech Solutions Inc.",
  location: "Remote",
  description: "We are looking for a talented Frontend Developer to join our team. You will work on exciting projects, building responsive and interactive user interfaces.",
  requirements: [
    "Proficiency in HTML, CSS, and JavaScript.",
    "Experience with React.js or similar frameworks.",
    "Familiarity with version control systems (e.g., Git).",
    "Strong problem-solving skills.",
    "Excellent communication and teamwork skills.",
  ],
  salary: "$70,000 - $90,000",
};

function JobDescription() {
  return (
    <section 
      className="h-screen flex items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: `url(${bg})` }} // Update the path to your background image
    >
      <div className="max-w-4xl mx-auto bg-white p-5 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{jobData.title}</h1>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">{jobData.company}</h2>
            <p className="text-gray-600">{jobData.location}</p>
          </div>
          <div className="bg-blue-500 text-white rounded-full px-4 py-2">
            <span>{jobData.salary}</span>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Job Description</h3>
          <p>{jobData.description}</p>
        </div>
        <div className='flex gap-10'>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Requirements</h3>
          <ul className="list-disc ml-5">
            {jobData.requirements.map((req, index) => (
              <li key={index} className="text-gray-600">{req}</li>
            ))}
          </ul>
        </div>
        <div>
          <img src={ Programmer } />
        </div>
        </div>
        <button className="bg-orange-500 text-white rounded-lg px-5 py-2 hover:bg-orange-700 transition-all">
          Apply Now
        </button>
      </div>
    </section>
  );
}

export default JobDescription;
