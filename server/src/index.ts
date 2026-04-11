import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db";
import authRouter from "./routes/authRoutes";
import cookieParser from "cookie-parser";


dotenv.config()
const app = express();


app.use(express.json());
app.use(cookieParser())

connectDB();

app.use("/api/auth",authRouter);
const PORT = process.env.PORT || 4000 
app.listen(PORT,()=>{
    console.log(`server running on the port : ${PORT}`)
})