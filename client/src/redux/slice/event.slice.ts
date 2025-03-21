import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import $api from "../../shared/axios.instance";

export const getEvent = createAsyncThunk<Event[], void>(
  "event/getEvent",
  async () => {
    try {
      const response = await $api(`${import.meta.env.VITE_URL}/event`);
      if (response.status !== 200) {
        throw new Error("Some went wrong");
      } else {
        // console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching events: ", error);
      throw error;
    }
  }
);
// interface User {
// 	id: number;
// 	login: string;
// 	email: string;
// 	token: string;
// }
interface Event {
  id?: number;
  name: string;
  date: string;
  description: string;
  img_url: string;
  // file: FileList;
  user_id: number;
  location: string;
  price: number;
  group: string;
  // user: User[];
}

interface IState {
  event: Event[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IState = {
  event: [],
  isLoading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    createEvent: (state, action: PayloadAction<Event[]>) => {
      state.event = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    changeEvent: (state, action) => {
      state.event = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEvent.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.event = action.payload;
        // console.log("State.event: ", state.event);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getEvent.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to fetch events";
      });
  },
});

export const { createEvent } = eventSlice.actions;

export default eventSlice.reducer;
