import {v2 as cloudinary} from "cloudinary";
import {ENV} from "./env.js";
cloudinary.config({
    cloud_name:ENV.CLOUDINARY_CLOUD_NAME,