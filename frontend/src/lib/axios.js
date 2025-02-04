import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5004/api" : "https://inventory-uci7-d3dvnqkkk-avinash-jhas-projects-07c4e106.vercel.app/api/",
  withCredentials: true,
});
