import React, {useRef } from 'react';

import PlaceholderProfile from '../../../assets/images/Profile-Placeholder.jpg';
const ClientProfileUpload = () => {
  const fileInputRef = useRef(null); // To reference the hidden file input

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result); // Update avatar with the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger the file input when the avatar is clicked
  const handleAvatarClick = () => {
    fileInputRef.current.click(); // Programmatically click the hidden file input
  };

  return (
    <div className="flex flex-col items-center">
        <div className="relative">
            <img
            src={PlaceholderProfile}
            alt="Profile Avatar"
            className="w-24 h-24 object-cover rounded-full border border-orange-500 cursor-pointer"
            onClick={handleAvatarClick} // Clicking the image opens file input
            />
            <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }} // Hidden file input
            accept="image/*"
            onChange={handleImageChange}
            />
        </div>
        
    </div>
  );
};

// The export statement must be placed at the top level, outside of any other function or block
export default ClientProfileUpload;
