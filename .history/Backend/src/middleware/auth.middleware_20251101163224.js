import 

export const protectRoute = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = token.verify(token, ENV.JWT_SECRET);
      
        const user=await User.findById(decoded.id).select("-password");
        if(!user){
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        next();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
