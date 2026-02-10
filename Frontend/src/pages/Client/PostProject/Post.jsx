import { Link, useNavigate } from 'react-router-dom';
import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../../../context/AuthContext";

function PostProject() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const [formData, setFormData] = useState({
    name: "", 
    email: "",
    task: "Web Development",
    experience: "Beginner",
    communication: "Email",
    budget: "$10,000-$20,000",
    description: "",
    startDate: "",
    deadline: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    if (!token) {
      alert("Please login to post a project");
      navigate("/GetInfo");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        task: formData.task,
        description: formData.description,
        budget: formData.budget,
        deadline: formData.deadline,
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Project Posted Successfully!");
      navigate("/ClientDashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post project");
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-10">
        {}
        <section className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg ">
          <p className="text-2xl font-semibold text-gray-700 mb-6">
            Tell us about the Project
          </p>

          <div className="mb-6">
            <label className="block text-lg text-gray-700 font-medium mb-2">Project / Company Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Project Name"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg text-gray-700 font-medium mb-2">Email ID</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Email ID"
            />
          </div>

          {}
          <div className="mb-6">
            <label className="block text-lg text-gray-700 font-medium mb-2">
              What kind of project are you posting?
            </label>
            <select
              name="task"
              value={formData.task}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="Web Development">Web Development</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Content Writing">Content Writing</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Billing Software">Billing Software</option>
            </select>
          </div>

          {}
          <div className="mb-6">
            <label className="block text-lg text-gray-700 font-medium mb-2">
              Experience Needed
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="Beginner">Basic/Beginner level</option>
              <option value="Intermediate">Intermediate level</option>
              <option value="Pro">Pro level</option>
            </select>
          </div>

          {}
          <div className="mb-6">
            <label className="block text-lg text-gray-700 font-medium mb-2">
              Preferred Communication Method
            </label>
            <select
              name="communication"
              value={formData.communication}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="Email">Email</option>
              <option value="Whatsapp">Whatsapp</option>
              <option value="Linkedin">Linkedin</option>
            </select>
          </div>

          {}
          <div className="mb-6">
            <label className="block text-lg text-gray-700 font-medium mb-2">
              Budget
            </label>
            <div className="flex items-center">
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="$10,000-$20,000">$10,000-$20,000</option>
                <option value="$20,000-$30,000">$20,000-$30,000</option>
                <option value="Above $30,000">Above $30,000</option>
              </select>
            </div>
          </div>

          {}
          <div className="mb-6">
            <label className="block text-lg text-gray-700 font-medium mb-2">Overview about project</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
              rows="5"
              placeholder="Provide a brief overview..."
            ></textarea>
          </div>

          <div className='flex md:flex-row flex-col'>
            {}
            <div className='flex space-x-4 align-center'>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-6 md:ml-20">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Upload Project with Requirements
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  onClick={triggerFileSelect}
                  className="px-4 py-2 bg-orange-200 text-orange-500 rounded-full focus:ring-2 focus:ring-orange-500"
                >
                  Choose File
                </button>

                <span className="text-gray-600">
                  {fileName ? fileName : "No file chosen"}
                </span>
              </div>
            </div>
          </div>
          {}
          <div className="text-right mt-4">
            <button
              onClick={handleSubmit}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-300 focus:ring-2 focus:ring-orange-500">
              Upload Project
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default PostProject;
