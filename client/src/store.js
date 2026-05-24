import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice";
import walletReducer from "./redux/walletSlice";
import transactionReducer from "./redux/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletReducer,
    transaction: transactionReducer,
  },
});
