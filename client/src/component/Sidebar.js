// Sidebar.js
import React from "react";
import MenuItem from "./MenuItem";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Sidebar = ({ openSidebar, name }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div
      className={`
        fixed lg:static top-0 left-0 z-50
        h-screen w-[260px]
        bg-[#071028] text-white
        transform transition-transform duration-300
        ${openSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-3xl font-bold text-blue-400">
          {name?.toUpperCase()}
        </h1>

        <p className="text-gray-300 mt-1">Digital Wallet</p>
      </div>

      <div className="p-5 space-y-3">
        <MenuItem title="Dashboard" path="/dashboard" />

        <MenuItem title="Add Money" path="/add-money" />

        <MenuItem title="Transfer Money" path="/transfer-money" />

        <MenuItem title="Transactions" path="/history" />
      </div>

      <div className="absolute bottom-6 left-5 right-5">
        <button
          className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
