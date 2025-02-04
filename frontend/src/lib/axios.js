import axios from "axios";

export const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5004/api" : "https://inventory-3-907g.onrender.com/api",
=======
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5004/api" : "https://inventory-management-hg.vercel.app/api",
>>>>>>> origin/main
  withCredentials: true,
});
