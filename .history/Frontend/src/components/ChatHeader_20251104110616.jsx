import { Camera, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import ProfileUpdateModal from "./ProfileUpdateModal";

function ProfileHeader() {
  const { authUser, logout } = useAuthStore();

  console.log(authUser);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <>
      <div className="bg-slate-800 border-b border-slate-700 rounded-b-lg shadow-md">
        <div className="flex  items-center gap-5">
          {/* Profile Image + Camera Button + Online Status */}
          <div className="relative w-10 h-10">
            <img
              src={authUser?.profilePic || "/avatar.png"}
              alt={authUser?.fullName || "Profile"}
              className="w-10 h-10 rounded-full object-cover border-2 border-slate-600 shadow-lg"
            />
          </div>

          {/* User Details */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-slate-100">
              {authUser?.fullName || "Guest User"}
            </h2>

            <div className="mt-1 flex items-center justify-center gap-1 text-xs text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
