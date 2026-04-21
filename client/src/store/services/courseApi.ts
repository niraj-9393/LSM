import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Course {
    _id?: string;
    title: string;
    subTitle: string;
    description?: string;
    createdBy: string;
    price?: number;
    thumbnail?: string;
    level?: "beginner" | "intermediate" | "advanced";
    isPublished?: boolean;
    lectures?: string[];
}

interface createCourseBody {
    title: string;
    subTitle: string;
}

export const courseApi = createApi({
    reducerPath: "courseApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/course",
        credentials: "include",
    }),
    tagTypes: ["Course"],
    endpoints: (builder) => ({


        myCourse: builder.query<{ courses: Course[] }, void>({
            query: () => ({
                url: "my-courses",
                method: "GET",
            }),
             providesTags: ["Course"],
        }),

        getPublishedCourses: builder.query<{ courses: Course[] }, void>({
            query: () => ({
                url: "published",
                method: "GET",
            }),
            providesTags: ["Course"], 
        }),

        createCourse: builder.mutation<
            { course: Course },
            createCourseBody
        >({
            query: (body) => ({
                url: "create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Course"], 
        }),

        editCourse: builder.mutation<
            { course: Course },
            { courseId: string; formData: FormData }
        >({
            query: ({ courseId, formData }) => ({
                url: `edit/${courseId}`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Course"],
        }),

        togglePublished: builder.mutation<
            any,
            { courseId: string }
        >({
            query: ({ courseId }) => ({
                url: `toggle/${courseId}`,
                method: "POST",
            }),
            invalidatesTags: ["Course"], 
        }),

        deleteCourse: builder.mutation<
            any,
            { courseId: string }
        >({
            query: ({ courseId }) => ({
                url: `delete/${courseId}`,
                method: "POST",
            }),
            invalidatesTags: ["Course"],
        }),
    }),
});

export const {
    useMyCourseQuery,
    useGetPublishedCoursesQuery,
    useCreateCourseMutation,
    useEditCourseMutation,
    useTogglePublishedMutation,
    useDeleteCourseMutation,
} = courseApi;