import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        setCart(JSON.parse(cartItems));
    }
  }, []);

  const updateCart = (newCartData) => {
    const newData = newCartData===null? [] : newCartData;
    setCart(newData);
    localStorage.setItem('cartItems', JSON.stringify(newData));
  };

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
