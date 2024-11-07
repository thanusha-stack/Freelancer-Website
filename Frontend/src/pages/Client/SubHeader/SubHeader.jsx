import React, { useState, useEffect, useRef } from 'react';
import { useNavigate,Link } from 'react-router-dom'; // Import useNavigate
import CLNotifyBell from '../NotifyBell/NotifyBell';

function SubHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  // Close the menu if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to navigate to the dashboard
  const handleNavigateToDashboard = () => {
    navigate('/ClientDashboard'); // Adjust the route as necessary
    setShowMenu(false); // Close the menu after navigation
  };

  const handleNavigateToProjects = () => {
    navigate('/ClientViewProjects'); // Adjust the route as necessary
    setShowMenu(false); // Close the menu after navigation
  };
  return (
    <>
      <div className="bg-black shadow-md shadow-gray-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-3">
          {/* Profile Icon */}
          <svg
            onClick={toggleMenu}
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Notification Icon */}
          <div className="flex items-center gap-2">
            <CLNotifyBell />
          </div>

          {/* Dropdown Menu */}
          {showMenu && (
            <div
              ref={menuRef}
              className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-lg py-2"
            >
              <button 
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleNavigateToDashboard} // Use onClick here
              >
                Dashboard
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleNavigateToProjects}
              >
                View Projects
              </button>
              <Link to="/">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Log Out
              </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SubHeader;
