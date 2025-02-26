import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white sticky top-0 shadow-md z-50">
      <div className="max-w-full mx-auto px-4">
        <div className="flex w-full justify-between items-center py-4">
          {/* Logo */}
          <h1 className="text-xl font-bold">Recipe App</h1>

          {/* Navigation Links */}
          <div className=" flex flex-row gap-6  sm:text-base">
            <NavLink
              to="/display-recipes"
              className={({ isActive }) =>
                `hover:text-gray-200 ${isActive ? "border-b-2 scale-105 border-white" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `hover:text-gray-200 ${isActive ? "border-b-2 scale-105 border-white" : ""}`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/add-Recipe"
              className={({ isActive }) =>
                `hover:text-gray-200 ${isActive ? "border-b-2 scale-105 border-white" : ""}`
              }
            >
              Add Recipe
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `hover:text-gray-200 ${isActive ? "border-b-2 scale-105 border-white" : ""}`
              }
            >
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
