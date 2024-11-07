import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import logo from "../../assets/images/logo-color.png";
import MessageToggle from "../MessageToggle/MessageToggle";
import AboutUs from "../About Us/AboutUs";
import ProfileIcon from "../../assets/images/profile.svg";

function Navbar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(""); // New state for user role
    const drawerRef = useRef(null);
    const navigate = useNavigate();
  
    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const goBack = () => {
        setIsDrawerOpen(false);
        navigate(-1);
    };

    // Simulate role check for demonstration (replace with real role check logic)
    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn"); // Example check for login status
        const role = localStorage.getItem("userRole"); // Example check for user role (e.g., "freelancer" or "client")
        setIsLoggedIn(loggedIn === "true");
        setUserRole(role || ""); 
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutsideDropdown = (event) => {
            if (!event.target.closest('.dropdown')) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutsideDropdown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdown);
        };
    }, []);
  
    // Close side drawer when clicking outside
    useEffect(() => {
        const handleClickOutsideDrawer = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                setIsDrawerOpen(false);
            }
        };

        if (isDrawerOpen) {
            document.addEventListener('mousedown', handleClickOutsideDrawer);
        } else {
            document.removeEventListener('mousedown', handleClickOutsideDrawer);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDrawer);
        };
    }, [isDrawerOpen]);

    return (
        <div>
            {/* Navbar */}
            <nav className="fixed w-full px-3 justify-between items-center h-16 flex bg-white border border-gray top-0 z-10">
                <div className="flex">
                    <img src={logo} alt="Logo" style={{ width: "130px" }} />
                </div>

                <div className="hidden lg:flex items-center space-x-10">
                    <Link to="/" className="text-1xl font-semibold hover:text-orange-500 cursor-pointer duration-200">
                        Dashboard
                    </Link>
                    
                    {/* Conditional "Projects" Link based on role */}
                    <Link
                        to="/JobsListPage"
                        className="text-1xl font-semibold hover:text-orange-500 cursor-pointer duration-200"
                    >
                        Projects
                    </Link>

                    <div className="relative dropdown z-10">
                        <button onClick={toggleDropdown} className="text-1xl font-semibold hover:text-orange-500 cursor-pointer duration-200 flex items-center">
                            Services
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path d="M480-360 280-560h400L480-360Z" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <ul className="absolute bg-white shadow-md rounded-md mt-2 w-40 z-20">
                                <li className="hover:text-orange-500 p-2">
                                    <MessageToggle /> 
                                </li>
                                <li className="hover:text-orange-500 p-2">
                                    <Link to="/Support">Support</Link>
                                </li>
                                <li className="hover:text-orange-500 p-2">
                                    <Link to="/AboutUs">About Us</Link>
                                </li>
                            </ul>
                        )}
                    </div>

                   
                </div>

                <div className="flex lg:hidden cursor-pointer pr-5" onClick={toggleDrawer}>
                    {isDrawerOpen ? (
                        <i className="fa-solid fa-xmark text-2xl"></i>
                    ) : (
                        <i className="fa-solid fa-bars text-2xl"></i>
                    )}
                </div>
            </nav>

            {/* Side Drawer */}
            <div ref={drawerRef} className={`fixed z-10 top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-5 flex flex-col space-y-6">
                    <ul className="space-y-6">
                        <li><Link to="/" className="text-1xl font-bold hover:text-orange-500 duration-200">Dashboard</Link></li>
                        
                        {/* Conditional "Projects" Link in drawer */}
                        <li>
                            <Link
                                to={userRole === "freelancer" ? "/freelancer-projects" : "/client-projects"}
                                className="text-1xl font-bold hover:text-orange-500 duration-200"
                            >
                                Projects
                            </Link>
                        </li>

                        <li><Link to="/AboutUs" className="text-1xl font-bold hover:text-orange-500 duration-200">About Us</Link></li>
                        <li>
                            <div className="relative dropdown">
                                <button onClick={toggleDropdown} className="flex items-center text-1xl font-bold">
                                    Services
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                        <path d="M480-360 280-560h400L480-360Z" />
                                    </svg>
                                </button>
                                {isDropdownOpen && (
                                    <ul className="mt-2 space-y-2 absolute bg-white shadow-md rounded-md z-20">
                                        <li><MessageToggle /></li>
                                        <li><Link to="/Support" className="hover:text-orange-500 block">Support</Link></li>
                                    </ul>
                                )}
                            </div>
                        </li>
                        <li>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
