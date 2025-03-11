import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ApiResponse {
  token: string;
  accessToken: string;
  user: {
    id: number;
    login: string;
    email: string;
  };
}

export const api = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/auth/", credentials: "include" }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    createUser: builder.mutation<
      ApiResponse,
      { login: string; email: string; password: string }
    >({
      query: (newUser) => ({
        url: "/signup",
        method: "POST",
        body: newUser,
      }),
    }),

    loginUser: builder.mutation<
      ApiResponse,
      { email: string; password: string }
    >({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginUserMutation } = api;
