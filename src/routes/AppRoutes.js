// src/routes/AppRoutes.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login"; 
import Dashboard from "../components/Dashboard"; 
import User from "../components/User"; 
import UserList from "../components/UserList"; 


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
        <Route path="/user" element={<User />} />
        <Route path="/userlist" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
