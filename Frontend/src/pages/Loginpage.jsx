import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import img from "../assets/logo.jpg";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  LoaderIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900 min-h-screen">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full pl-10 pr-3 py-2 rounded-md bg-slate-800 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Enter your email address"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full pl-10 pr-10 py-2 rounded-md bg-slate-800 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-2 rounded-md bg-cyan-500 text-slate-900 font-semibold hover:bg-cyan-600 disabled:opacity-60 flex justify-center items-center"
                  >
                    {isLoggingIn ? (
                      <LoaderIcon className="w-5 h-5 animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center text-slate-400">
                  <Link to="/signup" className="text-cyan-400 hover:underline">
                    Don't have an account? Sign up
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div className="text-center">
                <img
                  src={img}
                  alt="Chat illustration"
                  className="w-full h-auto object-contain"
                />
                <h3 className="text-xl font-medium text-cyan-400 mt-6">
                  Connect With Friends
                </h3>
                <div className="mt-4 flex justify-center gap-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-600/20 text-cyan-400 text-sm font-medium">
                    Secure
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-600/20 text-cyan-400 text-sm font-medium">
                    Real-time
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-600/20 text-cyan-400 text-sm font-medium">
                    Simple
                  </span>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};
