import { Link } from 'react-router-dom';
import React, { useRef,useState } from 'react';

function PostProject() {
    
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [profileData, setProfileData] = useState({
    name: "",
    companyName: "",
    EmailID: "",
    location: "",
    country: "United States",
    phone: "",
    otp: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
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



    return (
      <>
        <body className="bg-gray-100 ">
          {/* Profile Creation Section */}
          <section className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg ">
            <p className="text-2xl font-semibold text-gray-700 mb-6">
              Tell us about the Project
            </p>
      
            <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Company Name</label>
          <input
            type="text"
            name="Company name"
            value={profileData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Name"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-medium mb-2">Email ID</label>
          <input
            type="text"
            name="EmailID"
            value={profileData.EmailID}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Email ID"
          />
        </div>

            {/* Work Type */}
            <div className="mb-6">
              <label className="block text-lg text-gray-700 font-medium mb-2">
                What kind of project are you posting?
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="Web Development">Web Development</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Content Writing">Content Writing</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Graphic Design">Mobile App Development</option>
                <option value="Digital Marketing">Billing Software</option>
              </select>
            </div>
  
            {/* Experience */}
            <div className="mb-6">
              <label className="block text-lg text-gray-700 font-medium mb-2">
                Experience Needed
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="Beginner">Basic/Beginner level</option>
                <option value="Intermediate">Intermediate level</option>
                <option value="Pro">Pro level</option>
              </select>
            </div>
  
            {/* Experience */}
            <div className="mb-6">
              <label className="block text-lg text-gray-700 font-medium mb-2">
                Preferred Communication Method
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="Email">Email</option>
                <option value="Whatsapp">Whatsapp</option>
                <option value="Linkedin">Linkedin</option>
              </select>
            </div>

            {/* Rate */}
            <div className="mb-6">
              <label className="block text-lg text-gray-700 font-medium mb-2">
                Budget
              </label>
              <div className="flex items-center">
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="$10,000-$20,000">$10,000-$20,000</option>
                <option value="$20,000-$30,000">$20,000-$30,000</option>
                <option value="Above $30,000">Above $30,000</option>
              </select>
                <span className="ml-3 text-gray-600">$</span>
              </div>
            </div>
  
            {/* Overview Section */}
            <div className="mb-6">
            <label className="block text-lg text-gray-700 font-medium mb-2">Overview about project</label>
            <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                rows="5"
                placeholder="Provide a brief overview of yourself..."
            ></textarea>
            </div>

      <div className='flex md:flex-row flex-col'>
                      {/* Deadline */}
          <div className='flex space-x-4 align-center'>
            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
             </div>    

            <div className="mb-6 md:ml-20">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Upload Project with Requirements
          </label>
          <div className="flex items-center space-x-4">
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Styled Button */}
            <button
              onClick={triggerFileSelect}
              className="px-4 py-2 bg-orange-200 text-orange-500 rounded-full focus:ring-2 focus:ring-orange-500"
            >
              Choose File
            </button>

            {/* Display File Name */}
            <span className="text-gray-600">
              {fileName ? fileName : "No file chosen"}
            </span>
          </div>
        </div>
     </div>
            {/* Save Button */}
            <div className="text-right mt-4">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-300 focus:ring-2 focus:ring-orange-500">
                <Link to="/ClientDashboard">
                Upload Project
                </Link>
              </button>
            </div>
          </section>
        </body>
      </>
    );
  }
  
  export default PostProject;
  