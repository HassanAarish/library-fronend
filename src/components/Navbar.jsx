import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const getAuthUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const authUser = getAuthUser();
  const profilePictureUrl =
    authUser?.profilePicture?.url || "https://placehold.co/600x400/png";

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const cartItemCount = 3;

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo / Title */}
        <div className="text-2xl font-bold">
          <Link to="/">Library</Link>
        </div>

        {/* Navigation Links - Right Aligned */}
        <div className="ml-auto flex items-center space-x-6">
          <Link to="/home" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/book" className="hover:text-gray-200">
            Books
          </Link>
          <Link to="/about" className="hover:text-gray-200">
            About
          </Link>

          {/* Cart Button */}
          <div className="relative flex items-center">
            <Link to="/cart" className="flex items-center hover:text-gray-200">
              <FaShoppingCart className="text-2xl" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center focus:outline-none"
            >
              <img
                src={profilePictureUrl}
                alt="Profile"
                className="w-8 h-8 object-cover rounded-full border-2 border-white"
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
      </div>
    </nav>
  );
};

export default Navbar;
