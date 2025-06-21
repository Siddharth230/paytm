import mongoose from "mongoose";
import { DATABASE_URL } from "./config.js";

export default async function ConnectDB() {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected to Database!!");
  } catch (e) {
    console.log("Error when connecting to Database", e.message);
  }
}

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

export const userModel = mongoose.model("User", userSchema);
