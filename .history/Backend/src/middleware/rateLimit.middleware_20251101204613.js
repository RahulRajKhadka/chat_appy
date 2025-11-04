import aj from "../lib/"

export const createRateLimitMiddleware = (rateLimitRule) => {
  return async (req, res, next) => {
    try {
      // Use user ID if authenticated, otherwise use IP
      const userId = req.user?._id?.toString() || req.ip;

      const decision = await aj.protect(req, {
        userId,
        requested: 1, // Request 1 token
        rules: [rateLimitRule],
      });

      console.log("Arcjet decision:", decision);

      if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
          return res.status(429).json({
            error: "Too many requests",
            message: "Please slow down and try again later",
            retryAfter: Math.ceil(decision.reason.resetTime / 1000), // seconds
          });
        }

        if (decision.reason.isBot()) {
          return res.status(403).json({
            error: "Forbidden",
            message: "Bot traffic detected",
          });
        }

        return res.status(403).json({
          error: "Forbidden",
          message: "Request blocked",
        });
      }

      // Request allowed
      next();
    } catch (error) {
      console.error("Rate limit error:", error);
      // Fail open - allow request if Arcjet fails
      next();
    }
  };
};