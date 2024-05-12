import React, { createContext, useState, useEffect } from 'react';

// Create Auth Context
export const AuthContext = createContext();

// Auth Context Provider Component
export const AuthProvider = ({ children }) => {
  // State to store user information
  const [user, setUser] = useState(null);

  // Effect to fetch user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Method to update user state and store in localStorage
  const updateUser = (newUserData) => {
    setUser(newUserData);
    if(newUserData===null){
      localStorage.removeItem('user');
    }else{
      localStorage.setItem('user', JSON.stringify(newUserData));
    }
  };

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
