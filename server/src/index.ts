import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRouter from "./routes/authRoutes";
import cookieParser from "cookie-parser";

import mongoose from "mongoose";
import courseRouter from "./routes/courseRoutes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDB();

app.use("/api/auth", authRouter);
app.use("/api/course",courseRouter)
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running on the port : ${PORT}`);
});