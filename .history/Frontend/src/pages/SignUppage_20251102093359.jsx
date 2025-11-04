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
      <div clasname="relative w-full  max-w-6xl md:h-["></div>
    
    </div>
  );
};
