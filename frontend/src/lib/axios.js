import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5004/api" : "https://inventory-management-hg.vercel.app/api",
  withCredentials: true,
});
