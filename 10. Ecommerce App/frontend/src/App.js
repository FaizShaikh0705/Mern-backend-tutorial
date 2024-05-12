import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { AuthProvider } from "./contexts/AuthContext";
import "./bootstrap.min.css"
import { CartProvider } from "./contexts/CartContext";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <MainLayout />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
