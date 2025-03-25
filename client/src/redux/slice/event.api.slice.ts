import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

interface ApiResponse {
  id?: number;
  name: string;
  date: string;
  description: string;
  // file: FileList;
  user_id: string;
  location: string;
  price: number;
}

export const apiEvent = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_URL}/event`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authSlicer.user?.token;
      console.log("token event: ", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Event"],
  endpoints: (builder) => ({
    createEvent: builder.mutation<
      ApiResponse,
      {
        id?: number;
        name: string;
        date: string;
        description: string;
        // fileList: FileList;
        user_id: number | undefined;
        location: string;
        price: number;
      }
    >({
      query: (newEvent) => ({
        url: "/",
        method: "POST",
        body: newEvent,
      }),
    }),
  }),
});

export const { useCreateEventMutation } = apiEvent;
