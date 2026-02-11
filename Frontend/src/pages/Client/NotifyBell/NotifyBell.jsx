import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

const CLNotifyBell = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [previousPath, setPreviousPath] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!isNotificationOpen) {
      setPreviousPath(location.pathname);
    }
  }, [isNotificationOpen, location.pathname]);

  const fetchUnreadCount = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/notifications/unread-count`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUnreadCount(response.data.count);
    } catch (err) {
      console.error("Failed to fetch unread count:", err);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [token]);

  const handleNotificationToggle = () => {
    if (isNotificationOpen) {
      setIsNotificationOpen(false);
      if (previousPath) {
        navigate(previousPath);
      }
    } else {

      setIsNotificationOpen(true);
      navigate('/ClientNotification');
    }
  };

  return (
    <div className="relative">
      <svg
        className="hover:fill-orange-500 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#FFFFFF"
        onClick={handleNotificationToggle}
      >
        <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
      </svg>
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </div>
  );
};

export default CLNotifyBell;
