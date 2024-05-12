import React from "react";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import LinkPage from "../pages/LinkPage";
import NotFound from "../pages/NotFound";
import "react-toastify/dist/ReactToastify.css";

function MainLayout() {
  const pageColors = {
    LOGIN: "bg-pink-700",
    SIGNUP: "bg-purple-700",
    HOME: "bg-green-700",
    DASBOARD: "bg-gray-300"
  };

  const location = useLocation();

  const getPageColor = () => {
    if (location.pathname === "/login") {
      return pageColors.LOGIN;
    } else if (location.pathname === "/signup") {
      return pageColors.SIGNUP;
    } else if(location.pathname==="/dashboard"){
      return pageColors.DASBOARD;
    } else {
      return pageColors.HOME;
    }
  };

  return (
    <div
      className={`flex flex-col justify-between min-h-screen py-10 px-5 ${getPageColor()}`}
    >
      <Header />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/:username" Component={LinkPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </div>
  );
}

export default MainLayout;
