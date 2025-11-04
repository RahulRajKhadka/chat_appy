import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const navigate = useNavigate();
  const[formData,setFormData]=useState({
    fullName:"",
    email:"",
    password:""
  });

  const {signup, isSigningUp}=useAuthStore();
  

  const handleSignup=(e)=>{
    e.preventDefault();
    console.log("Signing up:",formData);
    navigate("/login");
  
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-full  max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer/> 
        <div className="absolute inset-0 bg-white shadow-lg rounded-xl p-8 w-full h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded"
            >
              {isSigningUp ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
    
    </div>
  );
};
