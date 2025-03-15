import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ApiResponse {
  id?: number;
  name: string;
  date: string;
  description: string;
  // file: FileList;
  userId: string;
  location: string;
  price: number;
}

export const apiEvent = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_URL}/event`,
    credentials: "include",
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
        userId: number | undefined;
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
