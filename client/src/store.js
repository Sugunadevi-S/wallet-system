import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/features/authSlice";
import walletReducer from "../src/features/walletSlice";
import transactionReducer from "../src/features/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletReducer,
    transaction: transactionReducer,
  },
});
