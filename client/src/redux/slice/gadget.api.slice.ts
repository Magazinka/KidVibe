import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store"

interface GadgetResponse {
  id?: number;
  name: string;
  user_id: number;
  price: number;
  image?: string;
	category?: string;
}

export const apiGadget = createApi({
	reducerPath: "gadgetApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_URL}/gadget`,
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
	tagTypes: ["Gadget"],
	endpoints: builder => ({
		createGadget: builder.mutation<
			GadgetResponse,
			{
				id?: number;
				name: string;
				user_id: number;
				price: number;
				category?: string;
				image?: string;
			}
		>({
			query: newGadget => ({
				url: "/",
				method: "POST",
				body: newGadget,
			}),
		}),
	}),
});

export const { useCreateGadgetMutation } = apiGadget;
