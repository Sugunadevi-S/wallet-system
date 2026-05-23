import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { getProfile } from "../features/walletSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const [openSidebar, setOpenSidebar] = useState(false);

  const { name } = useSelector((state) => state.wallet);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <div className="flex bg-[#f4f7fc] min-h-screen">
      {/* Overlay */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar openSidebar={openSidebar} name={name} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <Navbar setOpenSidebar={setOpenSidebar} name={name} />

        {/* THIS IS IMPORTANT */}
        <div className="p-5 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
