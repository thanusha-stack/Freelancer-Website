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
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50 font-sans transition-all duration-500">
        { }
        <form
          onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
          className="max-w-4xl mx-auto p-8 sm:p-10 bg-white/60 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/60 hover:shadow-indigo-500/10 transition-all duration-500"
        >
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
              Tell us about your next big project
            </h2>
            <p className="text-gray-500 text-sm">Fill in the details below to find the perfect freelancer.</p>
          </div>

          <div className="mb-6 group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 transform group-hover:-translate-y-1 transition-transform">Project / Company Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3.5 bg-white/70 border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm"
              placeholder="Enter Project Name"
              required
            />
          </div>

          <div className="mb-6 group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 transform group-hover:-translate-y-1 transition-transform">Email ID</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3.5 bg-white/70 border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm"
              placeholder="Enter your Email ID"
              required
            />
          </div>

          { }
          <div className="mb-6 group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 transform group-hover:-translate-y-1 transition-transform">
              What kind of project are you posting?
            </label>
            <select
              name="task"
              value={formData.task}
              onChange={handleInputChange}
              className="w-full p-3.5 bg-white/70 border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm cursor-pointer hover:bg-white/90">
              <option value="Web Development">Web Development</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Content Writing">Content Writing</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Billing Software">Billing Software</option>
            </select>
          </div>

          { }
          <div className="mb-6 group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 transform group-hover:-translate-y-1 transition-transform">
              Experience Needed
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full p-3.5 bg-white/70 border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm cursor-pointer hover:bg-white/90">
              <option value="Beginner">Basic/Beginner level</option>
              <option value="Intermediate">Intermediate level</option>
              <option value="Pro">Pro level</option>
            </select>
          </div>

          { }
          <div className="mb-6 group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 transform group-hover:-translate-y-1 transition-transform">
              Preferred Communication Method
            </label>
            <select
              name="communication"
              value={formData.communication}
              onChange={handleInputChange}
              className="w-full p-3.5 bg-white/70 border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm cursor-pointer hover:bg-white/90">
              <option value="Email">Email</option>
              <option value="Whatsapp">Whatsapp</option>
              <option value="Linkedin">Linkedin</option>
            </select>
          </div>

          { }
          <div className="mb-6 group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 transform group-hover:-translate-y-1 transition-transform">
              Budget
            </label>
            <div className="flex items-center">
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full p-3.5 bg-white/70 border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm cursor-pointer hover:bg-white/90">
                <option value="$10,000-$20,000">$10,000-$20,000</option>
                <option value="$20,000-$30,000">$20,000-$30,000</option>
                <option value="Above $30,000">Above $30,000</option>
              </select>
            </div>
          </div>

          { }
          <div className="mb-6 group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 transform group-hover:-translate-y-1 transition-transform">Overview about project</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3.5 bg-white/70 border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm"
              rows="5"
              placeholder="Provide a brief overview..."
              required
            ></textarea>
          </div>

          <div className='flex md:flex-row flex-col'>
            { }
            <div className='flex space-x-4 align-center'>
              <div className="mb-6 group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 transform group-hover:-translate-y-1 transition-transform">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full p-3.5 bg-white/70 border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm"
                  required
                />
              </div>
              <div className="mb-6 group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 transform group-hover:-translate-y-1 transition-transform">
                  End Date
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full p-3.5 bg-white/70 border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm"
                  required
                />
              </div>
            </div>

            <div className="mb-6 md:ml-12 lg:ml-20 group flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2 transform group-hover:-translate-y-1 transition-transform">
                Upload Project with Requirements
              </label>
              <div className="flex items-center space-x-4 mt-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={triggerFileSelect}
                  className="px-6 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium rounded-xl transition-all duration-300 shadow-sm hover:shadow active:scale-95"
                >
                  <i className="fa-solid fa-cloud-arrow-up mr-2"></i> Choose File
                </button>

                <span className="text-gray-500 font-medium text-sm truncate max-w-[150px] inline-block">
                  {fileName ? fileName : "No file chosen"}
                </span>
              </div>
            </div>
          </div>
          { }
          <div className="text-right mt-8 border-t border-gray-100 pt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-8 py-3.5 rounded-xl hover:from-purple-700 hover:to-indigo-700 focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 text-lg">
              Upload Project <i className="fa-solid fa-arrow-right ml-2"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PostProject;
