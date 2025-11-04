import arcjet, { tokenBucket, detectBot, shield } from "@arcjet/node";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["userId"], 
  rules: [
    
    shield({
      mode: "LIVE",
    }),
    
    detectBot({
      mode: "LIVE",
      allow: [], 
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
  interval: 3600,
  capacity: 3,
});

export const authLoginRateLimit = tokenBucket({
  mode: "LIVE",
  refillRate: 5,
  interval: 900, 
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