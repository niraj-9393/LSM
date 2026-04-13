import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  _id: string;
  name: string;
  email: string;
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
  }),
});

export const {useLoginMutation,useLogoutMutation,useSignupMutation} = authApi;