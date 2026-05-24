import React, { useState } from "react";
import { addMoney } from "../redux/walletSlice";
import { useDispatch } from "react-redux";

const AddMoney = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");

  const handleAddMoney = async () => {
    try {
      await dispatch(addMoney({ amount }));
      alert("Money Added");
      setAmount("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow w-[400px]">
      <h1 className="text-2xl font-bold mb-5">Add Money</h1>
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-3 rounded-xl mb-5"
      />
      <button
        onClick={handleAddMoney}
        className="bg-blue-600 text-white w-full py-3 rounded-xl"
      >
        Add Money
      </button>
    </div>
  );
};
export default AddMoney;
