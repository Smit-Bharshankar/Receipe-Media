import React from "react";
import { NavLink } from "react-router-dom";
import { PiCookingPotBold } from "react-icons/pi";
import { IoLogIn } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-green-800 text-white sticky top-0 shadow-md z-50">
      <div className="max-w-full mx-auto px-4">
        <div className="flex w-full font-semibold font-josefin justify-around items-center py-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <PiCookingPotBold className="size-6 text-white" />
            <h1 className="text-xl font-bold">Recipe Media</h1>
          </NavLink>

          {/* Navigation Links */}

          <div className=" flex flex-row gap-6  sm:text-base">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-gray-200 ${isActive ? "border-b-2 scale-105 border-white" : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/display-recipes"
              className={({ isActive }) =>
                `hover:text-gray-200 ${isActive ? "border-b-2 scale-105 border-white" : ""}`
              }
            >
              Recipes
            </NavLink>

            <NavLink
              to="/add-Recipe"
              className={({ isActive }) =>
                `hover:text-gray-200 ${isActive ? "border-b-2 scale-105 border-white" : ""}`
              }
            >
              Add Recipe
            </NavLink>
          </div>

          <div className=" flex flex-row gap-8  sm:text-base">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `hover:text-gray-200 flex gap-1 items-center ${
                  isActive ? "border-b-2 scale-105 border-white" : ""
                }`
              }
            >
              Login
              <IoLogIn className="size-6" />
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `relative group hover:text-gray-200 flex gap-1 items-center ${
                  isActive ? "border-b-2 scale-105 border-white" : ""
                }`
              }
            >
              {/* Tooltip Text on Hover */}
              <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Profile
              </span>

              {/* Profile Icon */}
              <FaRegUser className="size-5" />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
