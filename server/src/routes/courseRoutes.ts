import express from "express";
import {
    getCourses,
    createCourse,
    editCourse,
    toggleIsPublished,
    getPublishedCourse,
    getCourseById,
    deleteCourse
} from "../controllers/courseController";
import { isAuth } from "../middleware/isAuth";
import { upload } from "../middleware/upload";


const courseRouter = express.Router();

courseRouter.get("/my-courses", isAuth, getCourses);////
courseRouter.post("/create", isAuth, createCourse);////
courseRouter.post("/edit/:courseId", isAuth, upload.single("thumbnail"), editCourse);///
courseRouter.post("/toggle/:courseId", isAuth, toggleIsPublished);///
courseRouter.post("/delete/:courseId", isAuth, deleteCourse);
courseRouter.get("/published", getPublishedCourse);/////


export default courseRouter;