import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});


const createBUser = async (userData: { username: string; email: string; fullName: string; password: string }) => {
  try {
    const response = await api.post("/users/create-buser", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const loginBUser = async (loginData: { email: string; password: string }) => {
  try {
    const response = await api.post("/users/login-buser", loginData);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

const verifyMeBUser = async () => {
  try {
    const response = await api.get("/users/verify-me-buser");
    return response.data;
  } catch (error) {
    console.error("Error verifying user:", error);
    throw error;
  }
};

const logoutBUser = async () => {
  try {
    const response = await api.post("/users/logout-buser");
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

const searchBUser = async (prefix: string, page: number = 1, limit: number = 10) => {
  try {
    const response = await api.get(`/users/search-buser?prefix=${prefix}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error searching user:", error);
    throw error;
  }
};

export { createBUser, loginBUser, verifyMeBUser, logoutBUser, searchBUser };