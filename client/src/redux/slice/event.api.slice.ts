import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ApiResponse {
  id: number;
  name: string;
  date: string;
  description: string;
  img_url: string;
  location: string;
  price: number;
}

export const apiEvent = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_URL}/event/`,
    credentials: "include",
  }),
  tagTypes: ["Event"],
  endpoints: (builder) => ({
    createEvent: builder.mutation<
      ApiResponse,
      {
        id: number;
        name: string;
        date: string;
        description: string;
        img_url: string;
        location: string;
        price: number;
      }
    >({
      query: (newEvent) => ({
        url: "/event",
        method: "POST",
        body: newEvent,
      }),
    }),
  }),
});

export const { useCreateEventMutation } = apiEvent;
