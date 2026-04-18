import express from "express";
import { getProfile, login, logout, signUp, updateProfile } from "../controllers/authController";
import { isAuth } from "../middleware/isAuth";
import { upload } from "../middleware/upload";

const authRouter = express.Router();

authRouter.post("/login",login);
authRouter.post("/signup",signUp);
authRouter.get("/logout",logout);
authRouter.get("/profile",isAuth,getProfile)
authRouter.post("/profile/update",isAuth,upload.single("profilePic"),updateProfile);
export default authRouter;