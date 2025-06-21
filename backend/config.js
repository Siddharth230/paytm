import dotenv from "dotenv";
dotenv.config();

export const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

export const DATABASE_URL = process.env.DATABASE_URL;
