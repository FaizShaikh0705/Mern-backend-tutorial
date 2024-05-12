import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/customer/LoginPage";
import CartPage from "../pages/customer/CartPage";
import LoggedInRoute from "../gaurds/LoggedInRoute";
import HomePage from "../pages/customer/HomePage";
import Header from "../components/Header";
import ProductPage from "../pages/customer/ProductPage";
import ProfilePage from "../pages/customer/ProfilePage";
import ShippingPage from "../pages/customer/Shipping";
import PlaceOrderScreen from "../pages/customer/PlaceOrderPage";
import OrderPage from "../pages/customer/OrderPage";
import SignupPage from "../pages/customer/SignupPage";
import MyOrdersPage from "../pages/customer/MyOrdersPage";

function MainLayout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<LoggedInRoute><ProfilePage /></LoggedInRoute>} />
        <Route path="/shipping" element={<LoggedInRoute><ShippingPage /></LoggedInRoute>} />
        <Route path="/placeorder" element={<LoggedInRoute><PlaceOrderScreen /></LoggedInRoute>} />
        <Route path="/orders/:orderId" element={<LoggedInRoute><OrderPage /></LoggedInRoute>} />
        <Route path="/myorders" element={<LoggedInRoute><MyOrdersPage /></LoggedInRoute>} />
      </Routes>
    </>
  );
}

export default MainLayout;
