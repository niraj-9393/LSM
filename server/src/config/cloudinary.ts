import { v2 as cloudinary } from 'cloudinary'
import dotenv from "dotenv"
import fs from "fs";
dotenv.config()
cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUD_NAME
});



export const uploadMedia = async (file: string) => {
    try {
        const uploadRes = await cloudinary.uploader.upload(file, {
            resource_type: "auto"
        });

        fs.unlink(file, (err) => {
            if (err) console.log("Failed to delete local file:", err);
        });

        return uploadRes;
    } catch (error) {
        console.log("error while use uploadMedia :", error);


        fs.unlink(file, () => { });
    }
};

export const deleteMediaFromCloudinary = async (publicId: string) => {
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.log("error while use deleteMeidaFormCloudinary :", error);
    }
}
export const deleteVideoFormCloudinary = async (publicId: string) => {
    try {
        await cloudinary.uploader.destroy(publicId, { resource_type: "video" })
    } catch (error) {
        console.log("error while use deleteVideoFormCloudinary :", error);
    }
}


