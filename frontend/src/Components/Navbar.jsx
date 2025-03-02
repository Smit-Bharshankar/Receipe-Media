import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { PiCookingPotBold } from "react-icons/pi";
import { IoLogIn } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi"; // Hamburger and Close Icons

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-green-800 text-white sticky top-0 shadow-md z-50">
      <div className="max-w-full mx-auto px-6">
        <div className="flex w-full justify-between items-center py-4 font-semibold font-josefin">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <PiCookingPotBold className="size-6 text-white" />
            <h1 className="text-xl font-bold">Recipe Media</h1>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
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

          {/* Desktop User Options */}
          <div className="hidden md:flex gap-6">
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

          {/* Hamburger Icon (Mobile) */}
          <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 py-4 text-center bg-green-700 rounded-md">
            <NavLink to="/" className="py-2 hover:text-gray-300" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>

            <NavLink
              to="/display-recipes"
              className="py-2 hover:text-gray-300"
              onClick={() => setMenuOpen(false)}
            >
              Recipes
            </NavLink>

            <NavLink
              to="/add-Recipe"
              className="py-2 hover:text-gray-300"
              onClick={() => setMenuOpen(false)}
            >
              Add Recipe
            </NavLink>

            <NavLink
              to="/login"
              className="py-2 hover:text-gray-300 flex justify-center items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              Login <IoLogIn className="size-5" />
            </NavLink>

            <NavLink
              to="/profile"
              className="py-2 hover:text-gray-300 flex justify-center items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              Profile <FaRegUser className="size-5" />
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
