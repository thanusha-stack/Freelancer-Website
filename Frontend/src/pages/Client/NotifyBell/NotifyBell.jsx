import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CLNotifyBell = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [previousPath, setPreviousPath] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Store the current path as the previous path if notifications are not open
    if (!isNotificationOpen) {
      setPreviousPath(location.pathname);
    }
  }, [isNotificationOpen, location.pathname]);

  const handleNotificationToggle = () => {
    if (isNotificationOpen) {
      // Close notifications and return to the previous path if it exists
      setIsNotificationOpen(false);
      if (previousPath) {
        navigate(previousPath);
      }
    } else {
      // Open notifications and navigate to the notification page
      setIsNotificationOpen(true);
      navigate('/ClientNotification');
    }
  };

  return (
    <div>
      <svg
        className="hover:fill-orange-500 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#FFFFFF"
        onClick={handleNotificationToggle} 
      >
        <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/>
      </svg>
    </div>
  );
};

export default CLNotifyBell;
