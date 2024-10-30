import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo / Title */}
        <div className="text-2xl font-bold">
          <Link to="/">Library</Link>
        </div>

        {/* Navigation Links */}
        <div className="mx-10 hidden md:flex space-x-6">
          <Link to="/home" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/books" className="hover:text-gray-200">
            Books
          </Link>
          <Link to="/about" className="hover:text-gray-200">
            About
          </Link>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center focus:outline-none"
          >
            <img
              src="https://placehold.co/600x400/png"
              alt="Profile"
              className="w-8 h-8 object-cover rounded-lg"
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Profile Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
