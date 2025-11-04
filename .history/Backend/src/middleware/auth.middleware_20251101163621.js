import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../Models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: "Unauthorized: No token provided" 
            });
        }

        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        
        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: "Unauthorized: User not found" 
            });
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.error(`Authentication error: ${error.message}`);
        
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ 
                success: false,
                message: "Unauthorized: Invalid token" 
            });
        }
        
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ 
                success: false,
                message: "Unauthorized: Token expired" 
            });
        }
        
        return res.status(500).json({ 
            success: false,
            message: "Internal server error" 
        });
    }
};
