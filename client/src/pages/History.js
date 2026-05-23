import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../features/transactionSlice";

const History = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);

  return (
    <div className="bg-white p-8 rounded-3xl shadow">
      <h1 className="text-3xl font-bold mb-8">Transaction History</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="pb-5">Type</th>
            <th className="pb-5">Amount</th>
            <th className="pb-5">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr key={item.id} className="h-16">
              <td>{item.type}</td>
              <td>₹{item.amount}</td>
              <td>{new Date(item.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
