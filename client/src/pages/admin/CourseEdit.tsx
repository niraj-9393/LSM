import { useMyCourseQuery, useEditCourseMutation } from '@/store/services/courseApi';
import { Loader2, ArrowLeft, Upload, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Title from "../../components/Title";
import { toast } from 'sonner';

function CourseEdit() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const { data, isLoading: isMycourseLoading } = useMyCourseQuery();
    const [editCourse, { isLoading: isSaving, isSuccess }] = useEditCourseMutation();

    const [title, setTitle] = useState<string>("");
    const [subTitle, setSubTitle] = useState<string>("");
    const [price, setPrice] = useState<number | "">("");
    const [description, setDescription] = useState<string>("");
    const [level, setLevel] = useState<string>("beginner");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

    const courses = data?.courses;
    const currCourse = courses?.find((c) => c._id === courseId);

    useEffect(() => {
        if (currCourse) {
            setTitle(currCourse.title || "");
            setSubTitle(currCourse.subTitle || "");

            setPrice(currCourse.price || "");
            setDescription(currCourse.description || "");
            setLevel(currCourse.level || "beginner");
            // Show existing thumbnail if available
            if (currCourse.thumbnail) {
                setThumbnailPreview(currCourse.thumbnail);
            }
        }
    }, [currCourse]);

    // Clean up object URL on unmount
    useEffect(() => {
        return () => {
            if (thumbnailPreview && thumbnail) {
                URL.revokeObjectURL(thumbnailPreview);
            }
        };
    }, [thumbnailPreview, thumbnail]);

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setThumbnail(file);
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setThumbnailPreview(objectUrl);
        } else {
            setThumbnailPreview(currCourse?.thumbnail || null);
        }
    };

    const handleSave = async () => {
        if (!courseId) return;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("subTitle", subTitle);
        formData.append("price", String(price === "" ? 0 : price));
        formData.append("description", description);
        formData.append("level", level);
        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }

        try {
            await editCourse({ courseId, formData }).unwrap();
            toast("course updata succesfully")
        } catch (err) {
            toast.error("Failed to save course:")
            console.log(err);
        }
    };

    if (isMycourseLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-[#10B981]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFFFF] text-[#1F2937] p-6">

            {/* Header */}
            <div className="max-w-3xl mx-auto mb-6">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#10B981] transition-colors mb-4 group"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>

                <Title title="Edit Course" subtitle="Update your course details" />
            </div>

            {/* Success Banner */}
            {isSuccess && (
                <div className="max-w-3xl mx-auto mb-4 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    <CheckCircle className="h-5 w-5 shrink-0" />
                    <span className="text-sm font-medium">Course updated successfully!</span>
                </div>
            )}

            {/* Form */}
            <div className="max-w-3xl mx-auto bg-[#F3F4F6] p-6 rounded-2xl shadow-sm space-y-5">

                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                        Course Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Complete React Developer Course"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                </div>

                {/* Subtitle */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Course Subtitle
                    </label>
                    <input
                        type="text"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                        placeholder="e.g. Learn React from scratch with real projects"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Course Price ($)
                    </label>
                    <input
                        type="number"
                        
                        value={price}
                        onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder="Describe what students will learn..."
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] resize-none"
                    />
                </div>

                {/* Level */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Course Level
                    </label>
                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>

                {/* Thumbnail */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Course Thumbnail
                    </label>

                    {/* Preview */}
                    {thumbnailPreview && (
                        <div className="mb-3 rounded-lg overflow-hidden border border-gray-200 bg-white w-full max-w-xs">
                            <img
                                src={thumbnailPreview}
                                alt="Thumbnail preview"
                                className="w-full h-40 object-cover"
                            />
                        </div>
                    )}

                    {/* File Input */}
                    <label className="flex items-center gap-3 cursor-pointer w-fit px-4 py-2 rounded-lg border border-dashed border-gray-300 bg-white hover:border-[#10B981] hover:bg-green-50 transition-colors text-sm text-gray-500 hover:text-[#10B981]">
                        <Upload className="h-4 w-4" />
                        {thumbnail ? thumbnail.name : "Choose a new thumbnail"}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                            className="hidden"
                        />
                    </label>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-5 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 text-sm transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg text-sm transition-colors"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="animate-spin h-4 w-4" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CourseEdit;