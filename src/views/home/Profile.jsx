import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../constant/data";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [profileUpdates, setProfileUpdates] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${baseURL}/profile`);
        setUser(response.data.data);
      } catch (error) {
        console.error("Error loading profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseURL}/profile-update`, profileUpdates);
      alert("Profile updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseURL}/update-password`, passwordData);
      alert("Password updated successfully");
    } catch (error) {
      console.error("Failed to update password", error);
    }
  };

  const handleAddProfilePicture = async () => {
    try {
      await axios.put(`${baseURL}/profile-picture`);
      alert("Profile picture added");
      window.location.reload();
    } catch (error) {
      console.error("Failed to remove profile picture", error);
    }
  };

  const handleRemoveProfilePicture = async () => {
    try {
      await axios.delete(`${baseURL}/remove-profile-picture`);
      alert("Profile picture removed");
      window.location.reload();
    } catch (error) {
      console.error("Failed to remove profile picture", error);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Profile
      </h2>

      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md mb-8">
        <img
          src={user.profilePicture?.url || "https://placehold.co/600x400/png"}
          alt="Profile"
          className="w-24 h-24 object-cover rounded-lg mb-4"
        />
        <button
          onClick={handleAddProfilePicture}
          className="text-red-500 hover:text-red-700 text-sm font-semibold"
        >
          Add Profile Picture
        </button>
        <button
          onClick={handleRemoveProfilePicture}
          className="text-red-500 hover:text-red-700 text-sm font-semibold"
        >
          Remove Profile Picture
        </button>
      </div>

      <form
        onSubmit={handleProfileUpdate}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Update Profile Information
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={profileUpdates.firstName || user.firstName || ""}
            onChange={(e) =>
              setProfileUpdates({
                ...profileUpdates,
                firstName: e.target.value,
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={profileUpdates.lastName || user.lastName || ""}
            onChange={(e) =>
              setProfileUpdates({ ...profileUpdates, lastName: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Profile
          </button>
        </div>
      </form>

      <form
        onSubmit={handlePasswordUpdate}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Update Password
        </h3>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword: e.target.value,
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
