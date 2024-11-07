import React, {useRef } from 'react';

import PlaceholderProfile from '../../../../assets/images/Profile-placeholder.jpg'
const Profile = () => {
  const fileInputRef = useRef(null); 
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
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

export default Profile;
