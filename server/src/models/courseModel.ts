import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
       
    },
    subTitle: {
      type: String,
       
    },
    description: {
      type: String,
       
    },
    price: {
      type: Number,
       
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
       
    },
    thumbnail: {
      type: String,
       
    },
    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture"
      }
    ],
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
       
    }
  },
  {
    timestamps: true
  }
);

export const Course = mongoose.model("Course", courseSchema);