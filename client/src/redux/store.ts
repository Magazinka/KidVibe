import { configureStore } from "@reduxjs/toolkit";
import { api } from "./slice/api.slice";
import authReducer from "./slice/auth.slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    authSlicer: authReducer,

  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

