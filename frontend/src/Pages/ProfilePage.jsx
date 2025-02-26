import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logoutUser } from "../Store/Slices/authSlice"; // Importing getUser action
import {
  FiLogOut,
  FiHeart,
  FiBookmark,
  FiLock,
  FiUser,
  FiBookOpen,
  FiMoreHorizontal,
} from "react-icons/fi";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  // Fetch current user details on mount
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // Ensures fulfilled state
      toast.success("Logout successful!");
      navigate("/display-recipes"); // Redirect to home
    } catch (error) {
      console.log("Error :", error.message);

      toast.error(error?.message || "Logout failed. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Loading & Error Handling */}
      {loading ? (
        <p className="text-center text-blue-500">Loading profile...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <>
          {/* Profile Header */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6">
            <img
              src={user?.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-400"
            />
            <h2 className="text-2xl font-semibold mt-3">{user?.username || "Username"}</h2>
            <p className="text-gray-500">@{user?.username?.toLowerCase() || "username"}</p>
          </div>

          {/* Navigation Section */}
          <div className="mt-6 bg-white shadow-lg rounded-xl p-4">
            <nav className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <ProfileLink to="/my-recipes" icon={<FiBookOpen />} label="Your Recipes" />
              <ProfileLink to="/liked-recipes" icon={<FiHeart />} label="Liked Recipes" />
              <ProfileLink to="/saved-recipes" icon={<FiBookmark />} label="Saved Recipes" />
              <ProfileLink to="/change-password" icon={<FiLock />} label="Change Password" />
              <ProfileLink to="/update-profile" icon={<FiUser />} label="Update Profile" />
              <ProfileLink to="/more-options" icon={<FiMoreHorizontal />} label="More" />
            </nav>
          </div>

          {/* Logout Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-2"
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Reusable Profile Link Component
const ProfileLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

export default ProfilePage;
