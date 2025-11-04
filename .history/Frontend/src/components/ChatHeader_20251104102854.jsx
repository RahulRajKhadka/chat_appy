function ProfileHeader({ onToggleSidebar }) {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      mockAuthStore.logout();
    }
  };

  const isOnline = mockAuthStore.onlineUsers.includes(
    mockAuthStore.authUser._id
  );

  return (
    <>
      <div className="bg-slate-800/40 backdrop-blur-md p-3 sm:p-4 lg:p-6">
        <div className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-5">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
            <img
              src={mockAuthStore.authUser?.profilePic || "/avatar.png"}
              alt={mockAuthStore.authUser?.fullName || "Profile"}
              className="w-full h-full rounded-full object-cover border-2 border-slate-600 shadow-lg"
            />

            <span
              className={`absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 block w-3 h-3 sm:w-4 sm:h-4 border-2 border-slate-800 rounded-full ${
                isOnline ? "bg-green-500 animate-pulse" : "bg-gray-500"
              }`}
            />

            <button
              onClick={() => setShowModal(true)}
              className="absolute bottom-0.5 left-0.5 sm:bottom-1 sm:left-1 bg-blue-500 hover:bg-blue-600 text-white p-1.5 sm:p-2 rounded-full shadow-md transition"
            >
              <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>

          <div className="text-center w-full px-2">
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-100 truncate">
              {mockAuthStore.authUser?.fullName || "Guest User"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 truncate">
              {mockAuthStore.authUser?.email || "No email"}
            </p>
            <div className="mt-1 flex items-center justify-center gap-1 text-xs text-green-400">
              <span
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                  isOnline ? "bg-green-400 animate-pulse" : "bg-gray-400"
                }`}
              />
              {isOnline ? "Online" : "Offline"}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-1.5 sm:py-2 px-3 sm:px-4 bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base rounded-lg font-medium transition-all shadow-sm"
          >
            <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
            Logout
          </button>
        </div>
      </div>

      {showModal && (
        <ProfileUpdateModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
