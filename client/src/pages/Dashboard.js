import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/walletSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { balance } = useSelector((state) => state.wallet);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        Wallet Balance
      </h2>

      <div className="w-[500px] bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl p-8 text-white shadow-lg">
        <p className="text-lg opacity-90">Total Balance</p>

        <h1 className="text-5xl font-bold mt-5">₹ {balance} </h1>
      </div>
    </div>
  );
};

export default Dashboard;
