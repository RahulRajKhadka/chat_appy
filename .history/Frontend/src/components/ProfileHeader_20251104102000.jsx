import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const ProfileHeader = () => {
  const { authUser, logout, onlineUsers } = useAuthStore();

  if (!authUser) return null;

  const isOnline = onlineUsers.includes(authUser._id);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-lg shadow-md">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={authUser.profilePic || "https://via.placeholder.com/40"}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
          />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
              isOnline ? "bg-green-500" : "bg-gray-500"
            }`}
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{authUser.fullName}</h2>
          <p className="text-sm text-gray-400">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button
        onClick={logout}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-sm rounded-md transition"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileHeader;
