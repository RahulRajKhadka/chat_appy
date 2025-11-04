export const protectRoute = async (req, res, next) => {
    const token = req.cookies.jwt;
    