import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import img from "../assets/"
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSignUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900 min-h-screen">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Create Account
                  </h2>
                  <p className="text-slate-400">Sign up for a new account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* FULL NAME */}
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full pl-10 pr-3 py-2 rounded-md bg-slate-800 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
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
                        placeholder="johndoe@gmail.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full pl-10 pr-3 py-2 rounded-md bg-slate-800 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={isSignUp}
                    className="w-full py-2 rounded-md bg-cyan-500 text-slate-900 font-semibold hover:bg-cyan-600 disabled:opacity-60 flex justify-center items-center"
                  >
                    {isSignUp ? (
                      <LoaderIcon className="w-5 h-5 animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                {/* LOGIN LINK */}
                <div className="mt-6 text-center text-slate-400">
                  <Link to="/login" className="text-cyan-400 hover:underline">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div className="text-center">
                <img
                  src={img}
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <h3 className="text-xl font-medium text-cyan-400 mt-6">
                  Start Your Journey Today
                </h3>
                <div className="mt-4 flex justify-center gap-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-600/20 text-cyan-400 text-sm font-medium">
                    Free
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-600/20 text-cyan-400 text-sm font-medium">
                    Easy Setup
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-600/20 text-cyan-400 text-sm font-medium">
                    Private
                  </span>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignUpPage;
