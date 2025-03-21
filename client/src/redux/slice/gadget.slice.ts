// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import $api from "../../shared/axios.instance";

// export const getGadget = createAsyncThunk<Gadget[], void>("gadget/getGadget", async () => {
// 	try {
// 		const response = await $api(`/gadget`);
// 		if (response.status !== 200) {
// 			throw new Error("Something went wrong");
// 		} else {
// 			console.log(response.data);
// 			return response.data;
// 		}
// 	} catch (error) {
// 		console.error("Error fetching gadgets: ", error);
// 		throw error;
// 	}
// });

// interface Gadget {
// 	id?: number;
// 	name: string;
// 	user_id: number;
// 	price: number;
// }

// interface IState {
// 	gadget: Gadget[];
// 	isLoading: boolean;
// 	error: string | null;
// }

// const initialState: IState = {
// 	gadget: [],
// 	isLoading: false,
// 	error: null,
// };

// const gadgetSlice = createSlice({
// 	name: "gadget",
// 	initialState,
// 	reducers: {
// 		createGadget: (state, action: PayloadAction<Gadget[]>) => {
// 			state.gadget = action.payload;
// 			state.isLoading = false;
// 			state.error = null;
// 		},
// 	},
// 	extraReducers: builder => {
// 		builder
// 			.addCase(getGadget.pending, state => {
// 				state.isLoading = true;
// 				state.error = null;
// 			})
// 			.addCase(getGadget.fulfilled, (state, action: PayloadAction<Gadget[]>) => {
// 				state.gadget = action.payload;
// 				console.log("State.gadget: ", state.gadget);
// 				state.isLoading = false;
// 				state.error = null;
// 			})
// 			.addCase(getGadget.rejected, state => {
// 				state.isLoading = false;
// 				state.error = "Failed to fetch gadgets";
// 			});
// 	},
//  "axios";

// export const getGadget = createAsyncThunk<Gadget[], void>(
//     "gadget/getGadget",
//     async () => {
//         try {
//             const response = await $api(`/gadget`);
//             if(response.status !== 200) {
//                 throw new Error("some went wrong");
//             } else {
//                 return response.data;
//             }
//         } catch (error) {
//             console.error("Error fetching events: ", error)
//             throw error;
//         }
//     }
// )

// interface Gadget {
//     id: number;
//     name: string;
//     img_url: string;
// }

// interface IState {
//     gadget: Gadget[];
//     isLoading: boolean;
//     error: string | null;
// }

// const initialState: IState = {
//     gadget: [],
//     isLoading: false,
//     error: null
// }

// const gadgetSlice = createSlice({
//     name: "gadget",
//     initialState,
//     reducers: {
//         createGadget: (state, action: PayloadAction<Gadget[]>) => {
//             state.gadget = action.payload;
//             state.isLoading = false;
//             state.error = null;
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getGadget.pending, (state) => {
//                     state.isLoading = true;
//                     state.error = null;
//                 })
//             .addCase(getGadget.fulfilled, (state, action: PayloadAction<Gadget[]>) => {
//                     state.gadget = action.payload;
//                     state.isLoading = false;
//                     state.error = null;
//                 })
//             .addCase(getGadget.rejected, (state, action) => {
//                     state.isLoading = false;
//                     state.error = "Failed to fetch events";
//                 });
//     },
// });

// export const { createGadget } = gadgetSlice.actions;

// export default gadgetSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import $api from "../../shared/axios.instance";
// ("axios");
interface Gadget {
	id: number;
	name: string;
	price: number;
	user_id: number;
	image?: string;
	category?: string;
}

export const getGadget = createAsyncThunk<Gadget[], void>("gadget/getGadget", async () => {
	try {
		const response = await $api(`/gadget`);
		if (response.status !== 200) {
			throw new Error("some went wrong");
		} else {
			return response.data;
		}
	} catch (error) {
		console.error("Error fetching events: ", error);
		throw error;
	}
});

export const getGadgetByCategory = createAsyncThunk<Gadget[], string>("gadget/getGadgetByCategory", async (category) => {
	try {
		const response = await $api(`/gadget?category=${category}`);
		if (response.status !== 200) {
			throw new Error("Something went wrong");
		}
		return response.data;
	} catch (error) {
		console.error("Error fetching gadgets by category: ", error);
		throw error;
	}
});
interface IState {
	gadget: Gadget[];
	isLoading: boolean;
	error: string | null;
}

const initialState: IState = {
	gadget: [],
	isLoading: false,
	error: null,
};

const gadgetSlice = createSlice({
	name: "gadget",
	initialState,
	reducers: {
		createGadget: (state, action: PayloadAction<Gadget[]>) => {
			state.gadget = action.payload;
			state.isLoading = false;
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getGadget.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getGadget.fulfilled, (state, action: PayloadAction<Gadget[]>) => {
				state.gadget = action.payload;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(getGadget.rejected, (state, action) => {
				state.isLoading = false;
				state.error = "Failed to fetch events";
			})
			.addCase(getGadgetByCategory.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getGadgetByCategory.fulfilled, (state, action: PayloadAction<Gadget[]>) => {
				state.gadget = action.payload;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(getGadgetByCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.error = "Failed to fetch gadgets by category";
			});
	},
});

export const { createGadget } = gadgetSlice.actions;

export default gadgetSlice.reducer;
