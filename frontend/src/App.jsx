import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DisplayRecipes from "./Pages/DisplayRecipes";
import Login from "./Pages/Login";
import RecipeForm from "./Pages/RecipeForm";
import Navbar from "./Components/Navbar";
import ProfilePage from "./Pages/ProfilePage";
import UpdateProfile from "./Pages/UpdateProfile";
import MyRecipes from "./Pages/MyRecipes";
import LikedRecipes from "./Pages/LikedRecipes";
import SavedRecipes from "./Pages/SavedRecipes";
import ChangePassword from "./Pages/ChangePassword";
import MoreOptions from "./Pages/MoreOptions";
import Home from "./Pages/Home";

import ProtectedRoute from "./Components/ProtectedRoute";
import { getUser } from "./Store/Slices/authSlice";
import Footer from "./Components/Footer";
import ScrolltoTop from "./Pages/ScrolltoTop";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(getUser()); // Fetch user details if not already in Redux
    }
  }, [dispatch, user]);
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          maxWidth: "300px",
          borderRadius: "4px",
          fontSize: "0.875rem",
          padding: "8px",
          color: "#050505",
          fontFamily: "sans-serif",
        }}
      />

      <ScrolltoTop />

      {/* Navbar */}
      <Navbar />

      <Routes>
        {/* Public Route  */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Private Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/display-recipes" element={<DisplayRecipes />} />
          <Route path="/add-Recipe" element={<RecipeForm />} />

          {/* Profile Routes */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/liked-recipes" element={<LikedRecipes />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/more-options" element={<MoreOptions />} />
        </Route>
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;
