import dotenv from "dotenv";

dotenv.config();

export const user = process.env.MAIL;
export const pass = process.env.APP_PASSWORD;
export const db_conn = process.env.MONGO_DB_URI;
export const db_name = process.env.DB_NAME;

export const cloud_secret = process.env.CLOUDINARY_API_SECRET;
export const cloud_key = process.env.CLOUDINARY_API_KEY;
export const cloudinary_collection = process.env.CCLOUDINARY_URL_COLL;
