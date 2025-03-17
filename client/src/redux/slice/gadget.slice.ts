import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import $api from "../../shared/axios.instance";
 "axios";

export const getGadget = createAsyncThunk<Gadget[], void>(
    "gadget/getGadget",
    async () => {
        try {
            const response = await $api(`${import.meta.env.VITE_URL}/gadget`);
            if(response.status !== 200) {
                throw new Error("some went wrong");
            } else {
                return response.data;
            }
        } catch (error) {
            console.error("Error fetching events: ", error)
            throw error;
        }
    }
)


interface Gadget {
    id: number;
    name: string;
    img_url: string;
}

interface IState {
    gadget: Gadget[];
    isLoading: boolean;
    error: string | null;
}

const initialState: IState = {
    gadget: [],
    isLoading: false,
    error: null
}

const gadgetSlice = createSlice({
    name: "gadget",
    initialState,
    reducers: {
        createGadget: (state, action: PayloadAction<Gadget[]>) => {
            state.gadget = action.payload;
            state.isLoading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGadget.pending, (state) => {
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
                });
    },
});

export const { createGadget } = gadgetSlice.actions;

export default gadgetSlice.reducer;