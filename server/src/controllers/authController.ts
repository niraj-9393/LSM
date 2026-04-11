import { Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "../util/tokenGen";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(409)
        .json({ message: "User already registered with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exist = await User.findOne({ email });

    if (!exist) {
      return res.status(400).json({ message: "Register first" });
    }
    const isMatch: boolean = await bcrypt.compare(
      password,
      exist.password
    );

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Wrong password, try again!" });
    }

    const token = generateToken(exist._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login successful 🎉",
      user: exist,
    });

  } catch (error) {
    return res.status(500).json({ error });
  }
};


export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), 
    });

    return res.status(200).json({
      message: "Logged out successfully 👋",
    });

  } catch (error) {
    return res.status(500).json({ error });
  }
};