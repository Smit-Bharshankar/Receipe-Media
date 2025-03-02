import React from "react";
import cook1 from "../assets/cook_image1.jpg";
import RecipePostCard from "../Components/RecipePostCard";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="font-josefin">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-600 w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-12 font-josefin">
        {/* Left: Text Section */}
        <div className="text-white text-center md:text-left max-w-[90%] md:max-w-[50%]">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">Cook. Share. Connect.</h1>
          <p className="mt-4 text-lg md:text-xl">
            Explore delicious recipes from around the world or share your own culinary creations
            with a vibrant community of food lovers.
          </p>
          <NavLink
            to="/display-recipes"
            className="mt-6 inline-block bg-white text-green-700 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-all"
          >
            Get Started
          </NavLink>
        </div>

        {/* Right: Image Section */}
        <div className="relative w-full md:w-[50%] flex justify-center mt-8 md:mt-0">
          <img
            src={cook1}
            alt="Cooking"
            className="w-[90%] md:w-[90%] lg:w-[80%] rounded-lg shadow-xl shadow-green-900"
          />
        </div>
      </div>

      {/* Popular Recipes of the Week */}
      <div className="w-full flex items-center justify-center bg-slate-100">
        <div className="py-8 bg-slate-200 w-[95%] flex flex-col gap-9 px-8 justify-center">
          <div className="font-josefin py-6 text-3xl">
            <span>Popular Recipes of the Week</span>
          </div>

          {/* Recipes Cards  */}
          <div className="flex flex-col md:flex-row w-full gap-16">
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-[48%] md:w-[30%] p-4">
              <img src={cook1} alt={name} className="w-full h-[80%] object-cover rounded-lg" />
              <div className="mt-3">
                <h2 className="text-xl font-bold">Cook</h2>
                <p className="text-gray-600">By author</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-[48%] md:w-[30%] p-4">
              <img src={cook1} alt={name} className="w-full h-[80%] object-cover rounded-lg" />
              <div className="mt-3">
                <h2 className="text-xl font-bold">Cook</h2>
                <p className="text-gray-600">By author</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-[48%] md:w-[30%] p-4">
              <img src={cook1} alt={name} className="w-full h-[80%] object-cover rounded-lg" />
              <div className="mt-3">
                <h2 className="text-xl font-bold">Cook</h2>
                <p className="text-gray-600">By author</p>
              </div>
            </div>
          </div>

          {/* row 2 */}
          <div className="flex flex-col md:flex-row w-full gap-16">
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-[48%] md:w-[30%] p-4">
              <img src={cook1} alt={name} className="w-full h-[80%] object-cover rounded-lg" />
              <div className="mt-3">
                <h2 className="text-xl font-bold">Cook</h2>
                <p className="text-gray-600">By author</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-[48%] md:w-[30%] p-4">
              <img src={cook1} alt={name} className="w-full h-[80%] object-cover rounded-lg" />
              <div className="mt-3">
                <h2 className="text-xl font-bold">Cook</h2>
                <p className="text-gray-600">By author</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-[48%] md:w-[30%] p-4">
              <img src={cook1} alt={name} className="w-full h-[80%] object-cover rounded-lg" />
              <div className="mt-3">
                <h2 className="text-xl font-bold">Cook</h2>
                <p className="text-gray-600">By author</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Easy and Quick Recipes  */}
      <div className="flex flex-col flex-wrap justify-center gap-6 px-6 py-8">
        <div
          className="h-52 rounded-xl flex flex-col items-center justify-center text-white text-4xl font-bold bg-cover bg-center"
          style={{ backgroundImage: `url(${cook1})` }}
        >
          Best Easy and Fast Recipes
          <span className="font-semibold text-sm">Enjoy our wide variety and do it DIY</span>
        </div>
        <div className="flex items-center justify-center py-3">
          <span className="text-4xl font-semibold">Fresh From Our Community</span>
        </div>
        <RecipePostCard />
      </div>
    </div>
  );
};

export default Home;
