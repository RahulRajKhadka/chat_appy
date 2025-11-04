import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import { ENV } from "../lib/env.js";

import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
      res.status(201).json({
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
      });

      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          ENV.CLIENT_URL
        );
      } catch (error) {
        console.error("Error sending welcome email:", error);
      }
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      message: "Login successful",
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Logout successful" });
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, profilePic } = req.body;
    const updatedData = {};

    if (fullName) updatedData.fullName = fullName;

    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        folder: "profile_pics",
      });
      updatedData.profilePic = uploadResponse.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    // req.user is set by protectRoute middleware
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
Step 2: Verify Your Auth Middleware
Make sure your src/middleware/auth.middleware.js looks like this:
javascriptimport jwt from "jsonwebtoken";
import User from "../Models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
Step 3: Updated Auth Routes (Complete)
Your src/routes/auth.route.js should look like this:
javascriptimport express from "express";
import { 
  signup, 
  login, 
  logout, 
  updateProfile, 
  checkAuth 
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createRateLimitMiddleware } from "../middleware/rateLimit.middleware.js";
import { authSignupRateLimit, authLoginRateLimit } from "../lib/arcjet.js";

const router = express.Router();

router.post("/signup", createRateLimitMiddleware(authSignupRateLimit), signup);
router.post("/login", createRateLimitMiddleware(authLoginRateLimit), login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;
How checkAuth Works:

Frontend calls /api/auth/check when app loads
protectRoute middleware verifies JWT token from cookies
If valid: Returns user data (without password)
If invalid: Returns 401 Unauthorized

Frontend Usage Example:
javascript// In your React/Vue/etc. app
const checkAuthentication = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/check', {
      credentials: 'include' // Important: sends cookies
    });
    
    if (response.ok) {
      const userData = await response.json();
      console.log('User is logged in:', userData);
      // Set user state, redirect to chat, etc.
    } else {
      console.log('User is not logged in');
      // Redirect to login page
    }
  } catch (error) {
    console.error('Auth check failed:', error);
  }
};

// Call on app mount
useEffect(() => {
  checkAuthentication();
}, []);
Response Examples:
✅ Authenticated:
json{
  "_id": "507f1f77bcf86cd799439011",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": "https://cloudinary.com/...",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
❌ Not Authenticated:
json{
  "message": "Unauthorized - No Token Provided"
}
Now your auth system is complete with all necessary endpoints! 🎉RetryClaude can make mistakes. Please double-check responses.