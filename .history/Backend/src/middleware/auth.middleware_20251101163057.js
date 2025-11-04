export const protectRoute = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = token.verify(token, ENV.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
