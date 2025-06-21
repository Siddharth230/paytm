import express from "express";
import ConnectDB from "./db.js";
import dotenv from "dotenv";
import { rootRouter } from "./routes/index.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

ConnectDB();

app.use("/api/v1", rootRouter);

app.listen(3000);
