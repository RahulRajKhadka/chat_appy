import arcjet, { tokenBucket, detectBot, shield } from "@arcjet/node";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["userId"], // Track by user ID
  rules: [
    // Protect against common attacks
    shield({
      mode: "LIVE",
    }),
    // Detect and block bots
    detectBot({
      mode: "LIVE",
      allow: [], // Block all bots
    }),
  ],
});

// Rate limit configurations
export const messageRateLimit = tokenBucket({
  mode: "LIVE",
  refillRate: 20, 
  interval: 60, 
  capacity: 20, 
});

export const authSignupRateLimit = tokenBucket({
  mode: "LIVE",
  refillRate: 3,
  interval: 3600, // 1 hour
  capacity: 3,
});

export const authLoginRateLimit = tokenBucket({
  mode: "LIVE",
  refillRate: 5,
  interval: 900, // 15 minutes
  capacity: 5,
});

export const fetchContactsRateLimit = tokenBucket({
  mode: "LIVE",
  refillRate: 30,
  interval: 60,
  capacity: 30,
});

export const fetchMessagesRateLimit = tokenBucket({
  mode: "LIVE",
  refillRate: 60,
  interval: 60,
  capacity: 60,
});

export default aj;