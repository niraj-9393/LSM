import mongoose from "mongoose";
import {IUser} from "../types/type";
const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    role: {
      type: String,
      enum: ["student", "instructor"],
      default: "student",
    }

  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);