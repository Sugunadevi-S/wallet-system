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

// Async thunk for adding money to wallet
export const addMoney = createAsyncThunk(
  "wallet/addMoney",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API}/add-money`, data, {
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

// Async thunk for transferring money to another user
export const transferMoney = createAsyncThunk(
  "wallet/transferMoney",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API}/transfer`, data, {
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

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    balance: 0,
    error: null,
    success: null,
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
        state.success = action.payload.message || "Money added successfully";
      })
      .addCase(addMoney.rejected, (state, action) => {
        state.error = action.payload.message || "Failed to add money";
      })
      .addCase(transferMoney.fulfilled, (state, action) => {
        state.balance = action.payload.balance;
        state.success =
          action.payload.message || "Money transferred successfully";
      })
      .addCase(transferMoney.rejected, (state, action) => {
        state.error = action.payload.message || "Failed to transfer money";
      });
  },
});

export default walletSlice.reducer;
