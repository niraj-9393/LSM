import { Request, Response } from "express";
import { Course } from "../models/courseModel";
import { deleteMediaFromCloudinary, uploadMedia } from "../config/cloudinary";

export const getCourses = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;

        const courses = await Course.find({ createdBy: userId });

        if (courses.length === 0) {
            return res.status(200).json({
                message: "No courses found, go create one ",
                courses: []
            });
        }

        return res.status(200).json({
            message: "Courses fetched successfully ",
            courses
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong ",
            error
        });
    }
};


export const createCourse = async (req: Request, res: Response) => {
    try {
        const { title, subTitle } = req.body;
        const userId = req.userId;
        if (!title || !subTitle) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const newCourse = await Course.create({ createdBy: userId, title, subTitle });

        return res.status(200).json({ message: "course created ", course: newCourse })

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong ",
            error
        });
    }
};


export const editCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const { title, subTitle, description, price, level, } = req.body;
        const thumbnail = req.file;

        const userId = req.userId;

        const course = await Course.findOne({ _id: courseId, createdBy: userId });

        if (!course) {
            return res.status(404).json({
                message: "Course not found "
            });
        }

        if (title) course.title = title;
        if (subTitle) course.subTitle = subTitle;
        if (description) course.description = description;
        if (price) course.price = price;
        if (level) course.level = level;

        if (thumbnail) {
            if (course.thumbnail) {
                const publicId = course.thumbnail.split("/").pop()?.split(".")[0];
                if (publicId) {
                    await deleteMediaFromCloudinary(publicId);
                }
            }

            const cloudResponse = await uploadMedia(thumbnail.path);

            if (!cloudResponse?.secure_url) {
                return res.status(500).json({ message: "Upload failed" });
            }

            course.thumbnail = cloudResponse.secure_url;
        }

        await course.save();

        return res.status(200).json({
            message: "Course updated successfully ",
            course
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong ",
            error
        });
    }
};


export const toggleIsPublished = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const userId = (req as any).userId;

        const course = await Course.findOne({
            _id: courseId,
            createdBy: userId
        });

        if (!course) {
            return res.status(404).json({
                message: "Course not found "
            });
        }


        if (!course.isPublished && (!course.lectures || course.lectures.length === 0)) {
            return res.status(400).json({
                message: "Add at least one lecture before publishing "
            });
        }

        course.isPublished = !course.isPublished;

        await course.save();

        return res.status(200).json({
            message: `Course is now ${course.isPublished ? "published " : "unpublished "}`,
            course
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong ",
            error
        });
    }
};

export const getPublishedCourse = async (req: Request, res: Response) => {
    try {
        const courses = await Course.find({ isPublished: true });

        return res.status(200).json({
            message: "Published courses fetched successfully ",
            courses
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong ",
            error
        });
    }
};

export const getCourseById = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId).populate("lectures");

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({
            message: "Course fetched successfully",
            course
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
};
export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const userId = req.userId;

        const course = await Course.findOneAndDelete({
            _id: courseId,
            createdBy: userId
        });

        if (!course) {
            return res.status(404).json({
                message: "Course not found or not authorized"
            });
        }

        return res.status(200).json({
            message: "Course deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
};