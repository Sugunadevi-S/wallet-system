// Navbar.js
import React from "react";

const Navbar = ({ setOpenSidebar, name }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 lg:px-10 py-5 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-3xl"
          onClick={() => setOpenSidebar(true)}
        >
          ☰
        </button>

        {/* Welcome */}
        <div>
          <h1 className="text-xl lg:text-3xl font-bold">
            Welcome back, {name?.toUpperCase()} 👋
          </h1>

          <p className="text-sm lg:text-base text-blue-100 mt-1">
            Let’s take a look at your wallet dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
