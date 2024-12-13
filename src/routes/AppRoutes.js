// src/routes/AppRoutes.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login"; 
import Dashboard from "../components/Dashboard"; 

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} />  */}
        {/* Add more routes as needed */}
        {/* <Route path="*" element={<h1>404 - Page Not Found</h1>} />  */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
