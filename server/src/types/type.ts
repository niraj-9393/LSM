import { Types } from "mongoose";

export interface IUser {
  //   _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  enrolledCourses: Types.ObjectId[];
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICourse {
  title: string;
  subTitle: string;
  description: string;

  createdBy: Types.ObjectId;  

  price: number;
  thumbnail: string;

  level: "beginner" | "intermediate" | "advanced";

  isPublished: boolean;

  lectures: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}