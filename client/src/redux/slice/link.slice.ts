import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import $api from "../../shared/axios.instance";
import "axios";

// Асинхронный Thunk для получения списка ссылок
export const getLink = createAsyncThunk<Link[], void>(
    "link/getLink",
    async () => {
        try {
            const response = await $api(`${import.meta.env.VITE_URL}/link`);
            if (response.status !== 200) {
                throw new Error("Something went wrong");
            } else {
                return response.data;
            }
        } catch (error) {
            console.error("Error fetching links: ", error);
            throw error;
        }
    }
);


interface Link {
    id: number;
    name: string;
    url: string;
    img: string;
}


interface IState {
    link: Link[];
    isLoading: boolean;
    error: string | null;
}


const initialState: IState = {
    link: [],
    isLoading: false,
    error: null,
};


const linkSlice = createSlice({
    name: "link",
    initialState,
    reducers: {
        // Редьюсер для создания новой ссылки
        createLink: (state, action: PayloadAction<Link[]>) => {
            state.link = action.payload;
            state.isLoading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            
            .addCase(getLink.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            
            .addCase(getLink.fulfilled, (state, action: PayloadAction<Link[]>) => {
                state.link = action.payload;               
                state.isLoading = false;
                state.error = null;
            })
            
            .addCase(getLink.rejected, (state, action) => {
                state.isLoading = false;
                state.error = "Failed to fetch links";
            });
    },
});

// Экспорт actions
export const { createLink } = linkSlice.actions;

// Экспорт редьюсера
export default linkSlice.reducer;