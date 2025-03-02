import React from "react";
import { NavLink } from "react-router-dom";
import { PiCookingPotBold } from "react-icons/pi";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-green-600 text-slate-800 font-josefin py-8 px-6">
      {/* Top Section */}
      <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-between gap-6">
        {/* Logo Section */}
        <div className="flex md:ml-6 items-center justify-center md:justify-start w-full md:w-1/3">
          <NavLink to="/" className="text-black flex items-center gap-2 text-2xl font-bold">
            <PiCookingPotBold className="size-7" />
            Recipe Media
          </NavLink>
        </div>

        {/* Menu Links */}
        <div className="w-full md:w-1/3 flex flex-wrap justify-center md:justify-around gap-4 text-lg font-semibold">
          <div>
            <NavLink to="/recipes" className="underline underline-offset-4 ">
              Menu
            </NavLink>
            <h1>Home</h1>
            <h1>Recipes</h1>
            <h1>Articles</h1>
          </div>

          <div>
            <NavLink to="/about" className="underline underline-offset-4 ">
              About
            </NavLink>
            <h1>Privacy and Policy</h1>
            <h1>Terms of Use</h1>
          </div>

          <div>
            <NavLink to="/contact" className="underline underline-offset-4 ">
              Help
            </NavLink>
            <h1>Contact Us</h1>
            <h1>Our Plans</h1>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="w-full md:w-1/3 md:mr-6 text-2xl flex justify-center md:justify-end gap-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-gray-300 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-gray-300 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="hover:text-gray-300 transition" />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full flex items-center justify-center text-center mt-6 text-sm">
        <span className="font-semibold">
          © 2025 RecipeMedia. Cook, Share & Connect. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
