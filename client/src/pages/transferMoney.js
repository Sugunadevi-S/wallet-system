import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { transferMoney } from "../redux/walletSlice";

const TransferMoney = () => {
  const dispatch = useDispatch();
  const [receiverEmail, setReceiverEmail] = useState("");
  const [amount, setAmount] = useState("");

  // using wallet state directly when needed; removed unused `error` variable to fix lint warning

  const handleTransferMoney = async () => {
    try {
      await dispatch(
        transferMoney({
          receiverEmail,
          amount,
        }),
      ).unwrap();

      alert("Transfer successful");

      setReceiverEmail("");
      setAmount("");
    } catch (error) {
      alert(error?.message || error || "Transfer failed");
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
