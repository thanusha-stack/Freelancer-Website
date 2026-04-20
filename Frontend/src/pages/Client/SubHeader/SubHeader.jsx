import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CLNotifyBell from '../NotifyBell/NotifyBell';
import { AuthContext } from "../../../context/AuthContext";

function SubHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };
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
  const handleNavigateToDashboard = () => {
    navigate('/ClientDashboard');
    setShowMenu(false);
  };

  const handleNavigateToProjects = () => {
    navigate('/ClientViewProjects');
    setShowMenu(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <>
      <div className="bg-gray-900/95 backdrop-blur-md border-b-2 border-indigo-500/20 shadow-lg sticky top-0 z-50 font-sans transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-3">
          {}
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

          {}
          <div className="flex items-center gap-2">
            <CLNotifyBell />
          </div>

          {}
          {showMenu && (
            <div
              ref={menuRef}
              className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-lg py-2"
            >
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleNavigateToDashboard} 
              >
                Dashboard
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleNavigateToProjects}
              >
                View Projects
              </button>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SubHeader;
