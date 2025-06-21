import { Router } from "express";
import { userModel } from "../db.js";
import { z } from "zod";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { logger } from "../middlewares/logger.js";
import { JWT_USER_SECRET } from "../config.js";
import { auth } from "../middlewares/auth.js";

export const userRouter = Router();

userRouter.post("/signup", logger, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const requiredBody = z.object({
      username: z.string().min(3).max(20),
      email: z.string().email().min(3).max(100),
      password: z.string().min(8).max(30),
    });

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess) {
      return res.json({
        message: "Incorrect Format",
        error: parsedDataWithSuccess.error,
      });
    }

    const existingUserEmail = await userModel.findOne({ email });
    if (existingUserEmail) {
      return res.status(411).json({
        message: "User Email already exists",
      });
    }

    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res.status(411).json({
        message: "Username already exists",
      });
    }

    const hash = await argon2.hash(password, { type: argon2.argon2id });

    const user = await userModel.create({
      username,
      email,
      password: hash,
    });

    res.json({
      message: "You are signed up",
    });

    console.log(user);
  } catch (e) {
    res.status(500).json({
      message: "Invalid credentials",
    });
  }
});

userRouter.post("/signin", logger, async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  const passwordMatch = await argon2.verify(user.password, password);

  if (user && passwordMatch) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_USER_SECRET
    );
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }

  console.log(user.email);
});

userRouter.get("/me", auth, async (req, res) => {
  console.log("logged in to dashboard");
  res.json({
    message: "Dashboard",
  });
});
