// src/js/AuthContext.jsx
import React, { createContext, useState } from "react";

// Create context
export const AuthContext = createContext();

// Create provider
export const AuthProvider = ({ children }) => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  const login = () => {
    localStorage.setItem("isAdmin", "true");
    setAdminLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("isAdmin");
    setAdminLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ adminLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
