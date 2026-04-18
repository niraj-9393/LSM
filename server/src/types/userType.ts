import { Types } from "mongoose";

interface IUser {
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

export default IUser;