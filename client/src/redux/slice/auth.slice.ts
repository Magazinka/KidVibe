import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../shared/axios.instance";

export const getLogout = createAsyncThunk("logout/getLogout", async () => {
  try {
    const response = await $api(`${import.meta.env.VITE_URL}/auth/logout`);
    if (response.status !== 200) {
      throw Error("Something went wrong");
    } else {
      console.log("Logout successful", response.data);
    }
  } catch (error) {
    console.log("Error during logout: ", error);
  }
});

interface User {
  id: number;
  login: string;
  email: string;
  token: string;
}

interface AuthState {
  // id: any;
  user: User | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  // id: undefined
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userData: (state, action) => {
      console.log("action: ", action.payload);
      console.log("Login: ", action.payload);
      const { user, accessToken } = action.payload;
      state.user = { ...user, token: accessToken };

      //   state.user.token = accessToken;
      console.log("token: ", accessToken);
      console.log("id authSlice: ", user);

      state.user = user;
      state.isAuth = true;
    },
    loginUser: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = { ...user, token: accessToken };
      console.log("token: ", accessToken);
      console.log("state.user login: ", state.user);
      console.log("{ ...user, token: accessToken };: ", {
        ...user,
        token: accessToken,
      });
      state.isAuth = true;
      // state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLogout.fulfilled, (state) => {
      state.user = null;
      state.isAuth = false;
    });
  },
});

export const { userData, loginUser, logout } = authSlice.actions;
export default authSlice.reducer;
