import { configureStore } from "@reduxjs/toolkit";
import { api} from "./slice/api.slice";
import {apiEvent} from "./slice/event.api.slice"
import authReducer from "./slice/auth.slice";
import eventReducer from "./slice/event.slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    authSlicer: authReducer,
    [apiEvent.reducerPath]: apiEvent.reducer,
    eventSlicer: eventReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware).concat(apiEvent.middleware);

  },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
