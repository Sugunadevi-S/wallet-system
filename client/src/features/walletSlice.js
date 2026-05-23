import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/wallet";

// Async thunk for fetching wallet balance
export const getProfile = createAsyncThunk(
  "wallet/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API}/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Async thunk for user login
export const addMoney = createAsyncThunk(
  "wallet/addMoney",
  async (data, { rejectWithValue }) => {
    try {
      console.log("Adding money with data:", data);
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API}/add-money`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    balance: 0,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.balance = action.payload.balance;
        state.name = action.payload.name;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.error = action.payload.message || "Failed to fetch profile";
      })
      .addCase(addMoney.fulfilled, (state, action) => {
        state.balance = action.payload.balance;
      })
      .addCase(addMoney.rejected, (state, action) => {
        state.error = action.payload.message || "Failed to add money";
      });
  },
});

export default walletSlice.reducer;
