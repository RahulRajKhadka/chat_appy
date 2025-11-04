import "dotenv/config";

export const ENV={
    PORT:process.env.PORT||3000,
    MONGODB_URL:process.env.MONGODB_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    NODE_ENV:


}