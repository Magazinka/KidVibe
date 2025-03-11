import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: number;
  login: string;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userData: (state, action) => {
      console.log("action: ", action.payload);
      console.log("Login: ", action.payload.token)
      const { user, token } = action.payload;
      console.log('token: ', token);
      console.log("id authSlice: ", user);


      state.user = user;
      state.isAuth = true;
    },
    loginUser: (state, action) => {

      state.user = action.payload;
      console.log("TEST STATE: ", state.user);
      state.isAuth = true;
      // state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { userData, loginUser, logout } = authSlice.actions;
export default authSlice.reducer;
