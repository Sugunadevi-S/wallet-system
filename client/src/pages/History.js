import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../redux/transactionSlice";

const History = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className="bg-white p-8 rounded-3xl shadow w-full h-[70vh] flex flex-col">
      <h1 className="text-3xl font-bold mb-8 flex-shrink-0">
        Transaction History
      </h1>

      {/* Table Scroll Area */}
      <div className="flex-1 overflow-y-auto overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-5">Type</th>
              <th className="pb-5">Amount</th>
              <th className="pb-5">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => (
              <tr key={item.id} className="h-16 border-b hover:bg-gray-50">
                <td>{item.type}</td>

                <td className="font-medium">₹{item.amount}</td>

                <td>{new Date(item.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
