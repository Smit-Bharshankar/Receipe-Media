import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white sticky top-0 shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <h1 className="text-xl font-bold">Recipe App</h1>

          {/* Navigation Links */}
          <div className="space-x-6">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `hover:text-gray-200 ${isActive ? "border-b-2 border-white" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-gray-200 ${isActive ? "border-b-2 border-white" : ""}`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/addRecipe"
              className={({ isActive }) =>
                `hover:text-gray-200 ${isActive ? "border-b-2 border-white" : ""}`
              }
            >
              Add Recipe
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
