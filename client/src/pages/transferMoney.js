import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { transferMoney } from "../features/walletSlice";

const TransferMoney = () => {
  const dispatch = useDispatch();
  const [receiverEmail, setReceiverEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransferMoney = async () => {
    try {
      await dispatch(transferMoney({ receiverEmail, amount }));
      alert("Transfer Successful");
      setReceiverEmail("");
      setAmount("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow w-[450px]">
      <h1 className="text-2xl font-bold mb-5">Transfer Money</h1>
      <input
        type="email"
        placeholder="Receiver Email"
        value={receiverEmail}
        onChange={(e) => setReceiverEmail(e.target.value)}
        className="w-full border p-3 rounded-xl mb-5"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-3 rounded-xl mb-5"
      />
      <button
        onClick={handleTransferMoney}
        className="bg-blue-600 text-white w-full py-3 rounded-xl"
      >
        Transfer
      </button>
    </div>
  );
};

export default TransferMoney;
