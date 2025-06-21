import { Router } from "express";
import { userRouter } from "./user.js";

export const rootRouter = Router();

rootRouter.use("/user", userRouter);
