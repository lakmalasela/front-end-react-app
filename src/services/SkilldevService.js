// src/services/apiService.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8083", // Replace with your API base URL
});

//login
export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data; // Assumes the API response contains { token: "yourToken" }
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Fetch roles
export const fetchRoles = async () => {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from local storage
    const response = await api.get("/role/roles", {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to the request header
      },
    });
    console.log("ROLES ",response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error.response ? error.response.data : error;
  }
};

//user register
export const registerUser = async (userData) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await api.post("/user/register", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error.response ? error.response.data : error;
  }
};

// Fetch Users with pagination and search
export const fetchUsers = async (search = "", page = 0, size = 10) => {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from local storage
    const response = await api.get("/user/list", {
      params: {
        search: search,   // Search term (can be empty)
        page: page,       // Page number
        size: size        // Number of items per page
      },
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to the request header
      },
    });
    return response.data; // Assumes the API returns paginated user data
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response ? error.response.data : error;
  }
};

//logout
export const logout = () => {
  localStorage.removeItem("authToken"); 
  console.log("Logged out successfully");
  
};



export default api;
