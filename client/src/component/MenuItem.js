// MenuItem.js
import React from "react";
import { Link } from "react-router-dom";

const MenuItem = ({ title, path }) => {
  return (
    <Link
      to={path}
      className="
        block
        px-5 py-4
        rounded-xl
        hover:bg-blue-600
        transition
        text-lg
      "
    >
      {title}
    </Link>
  );
};

export default MenuItem;
