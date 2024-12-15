// src/contexts/AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken); // Save to local storage
    console.log("Token saved:", newToken);
  };

  const logout = () => {
    setToken(null); // Clear token state
    localStorage.removeItem("authToken"); // Remove token from local storage
    console.log("Logged out");

  };

  return (
    <AuthContext.Provider value={{ token, saveToken,logout  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
