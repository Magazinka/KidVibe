import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ApiResponse {
  img_url: string;
  user_id: number;
  title: string;
  description: string;
  date: string;
}

export const apiEvent = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/event/',
    credentials: 'include',
  }),
  tagTypes: ['Event'],
  endpoints: (builder) => ({
    createEvent: builder.mutation<ApiResponse, { 
      img_url: string;
      user_id: number;
      title: string;
      description: string;
      date: string;
    }>({
      query: (newEvent) => ({
        url: '/event',
        method: 'POST',
        body: newEvent,
      }),
    }),
  }),
});


export const { useCreateEventMutation } = apiEvent;
