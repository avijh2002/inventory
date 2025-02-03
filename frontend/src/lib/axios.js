import axios from "axios";

export const axiosInstance = axios.create({
  // Use absolute URL in production, local URL in development
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5004/api" // Local development URL
      : "/api", // In production, use the current domain for API calls
  withCredentials: true, // Ensure credentials (cookies) are sent
});