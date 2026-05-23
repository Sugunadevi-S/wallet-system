import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/transactions";
export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
);
const transactionSlice = createSlice({
  name: "transaction",
  initialState: { transactions: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
  },
});
export default transactionSlice.reducer;
