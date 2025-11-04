import { useState, useRef } from "react";
import { Camera, X, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

function ProfileUpdateModal({ isOpen, onClose }) {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = async () => {
    if (!selectedImage) {
      toast.error("Please select an image");
      return;
    }

    try {
      await updateProfile(selectedImage);
      onClose();
      setSelectedImage(null);
      setImagePreview(null);
    } catch (error) {
      // Error is handled in the store
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
    setImagePreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-700">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-200 mb-6">
          Update Profile Picture
        </h2>

        {/* Image preview */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-500/30">
              <img
                src={imagePreview || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-full shadow-lg transition-colors"
              disabled={isUpdatingProfile}
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          <p className="text-slate-400 text-sm text-center">
            Choose a new profile picture
            <br />
            <span className="text-xs text-slate-500">Max size: 5MB</span>
          </p>

          {/* Action buttons */}
          <div className="flex gap-3 w-full">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors"
              disabled={isUpdatingProfile}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateProfile}
              disabled={!selectedImage || isUpdatingProfile}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isUpdatingProfile ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdateModal;