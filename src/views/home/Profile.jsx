import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../constant/data";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [profileUpdates, setProfileUpdates] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const getAuthToken = () => localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${baseURL}/user/profile`, {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        setUser(response.data.data);
      } catch (error) {
        setError("Error loading profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (Object.keys(profileUpdates).length === 0) {
      setError("No changes made to update.");
      return;
    }

    try {
      await axios.put(`${baseURL}/user/profile-update`, profileUpdates, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      setMessage("Profile updated successfully");
      setError("");
    } catch (error) {
      setError("Failed to update profile");
      setMessage("");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    try {
      await axios.put(`${baseURL}/user/update-password`, passwordData, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      setMessage("Password updated successfully");
      setError("");
    } catch (error) {
      setError("Failed to update password");
      setMessage("");
    }
  };

  const handleAddProfilePicture = async () => {
    try {
      await axios.put(
        `${baseURL}/user/profile-picture`,
        { profilePicture: "" },
        {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
          "Content-Type": "application/json",
        }
      );
      setMessage("Profile picture added");
      setError("");
    } catch (error) {
      setError("Failed to add profile picture");
      setMessage("");
    }
  };

  const handleRemoveProfilePicture = async () => {
    try {
      await axios.delete(`${baseURL}/user/remove-profile-picture`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        "Content-Type": "application/json",
      });
      setMessage("Profile picture removed");
      setError("");
    } catch (error) {
      setError("Failed to remove profile picture");
      setMessage("");
    }
  };

  if (loading) return <p className="text-center">Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
        Profile
      </h2>

      {message && <p className="text-center text-green-600">{message}</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Profile PIcture DIV */}
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md mb-8">
        <img
          src={user.profilePicture?.url || "https://placehold.co/600x400/png"}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-lg mb-4 border-2 border-gray-300"
        />
        <div className="flex space-x-4">
          <button
            onClick={handleAddProfilePicture}
            className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
          >
            Add Profile Picture
          </button>
          <button
            onClick={handleRemoveProfilePicture}
            className="text-red-600 hover:text-red-800 text-sm font-semibold"
          >
            Remove Profile Picture
          </button>
        </div>
      </div>

      {/* Update Profile Information */}
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
            placeholder="Name"
            value={profileUpdates.name || user.name || ""}
            onChange={(e) =>
              setProfileUpdates({ ...profileUpdates, name: e.target.value })
            }
            onFocus={() => setError("")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Email"
            value={user.email || ""}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={profileUpdates.phoneNumber || user.phoneNumber || ""}
            onChange={(e) =>
              setProfileUpdates({
                ...profileUpdates,
                phoneNumber: e.target.value,
              })
            }
            onFocus={() => setError("")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={
              profileUpdates.dob ||
              (user.dob ? new Date(user.dob).toISOString().split("T")[0] : "")
            }
            onChange={(e) =>
              setProfileUpdates({ ...profileUpdates, dob: e.target.value })
            }
            onFocus={() => setError("")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={profileUpdates.gender || user.gender || ""}
            onChange={(e) =>
              setProfileUpdates({ ...profileUpdates, gender: e.target.value })
            }
            onFocus={() => setError("")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Profile
          </button>
        </div>
      </form>

      {/* Password DIV */}
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
            onFocus={() => setError("")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            onFocus={() => setError("")}
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
