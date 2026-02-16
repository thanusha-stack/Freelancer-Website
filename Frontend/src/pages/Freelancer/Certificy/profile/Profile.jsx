import React, { useRef, useState } from 'react';

import PlaceholderProfile from '../../../../assets/images/Profile-Placeholder.jpg'
const Profile = ({ onImageSelect }) => {
  const fileInputRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (onImageSelect) onImageSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <img
          src={avatarUrl || PlaceholderProfile}
          alt="Profile Avatar"
          className="w-24 h-24 object-cover rounded-full border border-orange-500 cursor-pointer"
          onClick={handleAvatarClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default Profile;
