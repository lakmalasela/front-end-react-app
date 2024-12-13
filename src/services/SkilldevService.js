// src/services/apiService.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8083", // Replace with your API base URL
});

export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data; // Assumes the API response contains { token: "yourToken" }
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default api;
