import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import $api from "../../shared/axios.instance";

export const getEvent = createAsyncThunk<Event[], void>(
  "event/getEvent", 
  async () => {
    try {
      const response = await $api("http://localhost:3001/event");
      if (response.status !== 200) {
        throw new Error("Some went wrong");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching events: ", error);
      throw error; 
    }
  }
);

interface Event {
  id: number;
  title: string;
  description: string;
  img_url: string;
  user_id?: number;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null; 
      })
      .addCase(getEvent.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.event = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Failed to fetch events"; 
      });
  },
});


export const { createEvent } = eventSlice.actions;

export default eventSlice.reducer;
