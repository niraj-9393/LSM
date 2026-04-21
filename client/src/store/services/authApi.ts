import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;              
  profilePicture?: string;    
  enrolledCourses?: any[];    
}

interface AuthResponse {
  message: string;
  user: User;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/auth",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),

    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),
    profile: builder.query<AuthResponse, void>({
      query: () => (
        {
          url: "/profile",
          method: "GET",

        }
      )
    }),
    updateProfile: builder.mutation<{ user: any }, FormData>({
      query: (formData) => (
        {
          url: "profile/update",
          method: "POST",
          body: formData
        }
      ),
    }),
    becomeInstructor: builder.mutation<{ message: string; role: string }, void>({
    query: () => ({
        url: '/become-instructor',
        method: 'PATCH',
    }),
}),
  }),

});

export const { useLoginMutation, useLogoutMutation, useSignupMutation, useProfileQuery, useUpdateProfileMutation ,useBecomeInstructorMutation} = authApi;