import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const MessageToggle = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNotificationToggle = () => {
    if (isNotificationOpen) {
      setIsNotificationOpen(false);
      navigate(-1); 
    } else {
      setIsNotificationOpen(true);
      navigate('/Messaging');
    }
  };

  return (
    <div>
      <p className='cursor-pointer hover:text-orange-500' onClick={handleNotificationToggle} >Messages</p>
    </div>
  );
};

export default MessageToggle;
