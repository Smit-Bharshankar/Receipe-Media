import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("auth/register", async (userData) => {
  const { data } = await axios.post("/api/auth/register", userData);
  return data;
});

export const loginUser = createAsyncThunk("auth/login", async (userData) => {
  const { data } = await axios.post("/api/auth/login", userData);
  return data;
});

const initialState = {
  user: null,
  token: null,
  loading: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
