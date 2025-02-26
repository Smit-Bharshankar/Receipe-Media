import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI || "http://localhost:5000/api/v1"; // Fallback URL

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BACKEND_URI}/recipe/register`, userData, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue({
        message: "Error while register user",
        details: error.response?.data || "No details available",
      }); // Return error message
    }
  }
);

export const loginUser = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${BACKEND_URI}/users/login`, userData, {
      withCredentials: true,
    });
    if (data) console.log("AuthSlice::loginUser :", data);
    return data;
  } catch (error) {
    return rejectWithValue({
      message: "Error while login user",
      details: error.response?.data || "No details available",
    }); // Return error message
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BACKEND_URI}/users/logout`, {}, { withCredentials: true });

    console.log("✅ Log from logoutUser in authSlice:", response.data);

    return response.data.success; // Ensure correct response
  } catch (error) {
    console.error("❌ Error during logout:", error.response?.data || error.message);
    return rejectWithValue({
      message: "Error while logging-out user",
      details: error.response?.data || "No details available",
    });
  }
});

export const getUser = createAsyncThunk("auth/getUser", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BACKEND_URI}/users/getUser`, { withCredentials: true });
    return response.data; // Ensure this matches API response structure
  } catch (error) {
    console.log(error);
    return rejectWithValue({
      message: "Error while fetching user in getUser authSlice",
      details: error.response?.data || "No details availiable",
    });
  }
});

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Reigster User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Registration failed";
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Login failed";
      })

      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })

      // Get User
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.data; // Ensure correct structure
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
