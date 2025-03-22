import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
