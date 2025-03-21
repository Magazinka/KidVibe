import { configureStore } from "@reduxjs/toolkit";
import { api } from "./slice/api.slice";
import { apiEvent } from "./slice/event.api.slice";
import { apiGadget } from "./slice/gadget.api.slice";
import authReducer from "./slice/auth.slice";
import eventReducer from "./slice/event.slice";
import gadgetReducer from "./slice/gadget.slice";
import gadgetSlice from "./slice/gadget.slice";
import eventSlice from "./slice/event.slice";
import linkSlice from "./slice/link.slice";


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    authSlicer: authReducer,
    [apiEvent.reducerPath]: apiEvent.reducer,
    eventSlicer: eventReducer,
    [apiGadget.reducerPath]: apiGadget.reducer,
    gadgetSlicer: gadgetReducer,
    gadget: gadgetSlice,
    event: eventSlice,
    link: linkSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(api.middleware)
      .concat(apiEvent.middleware)
      .concat(apiGadget.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
