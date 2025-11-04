import "dotenv/config";

export const ENV={
    PORT:process.env.PORT||3000,
    MONGODB_URL:process.env.MONGODB_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    NODE_ENV:process.env.NODE_ENV||"development",
    CLIENT_URL:process.env.CLIENT_URL,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASSWORD:process.env.EMAIL_PASSWORD,
    EMAIL_FROM:process.env.EMAIL_FROM,
    EMAIL_FROM_NAME:process.env.EMAIL_FROM_NAME||"ChatApp",
    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET
}