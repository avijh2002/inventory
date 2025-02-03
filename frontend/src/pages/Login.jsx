import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js"; 
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { authUser, isLoggingIn, login } = useAuthStore();
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (formData) => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password) return toast.error("Password is required");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm(formData);

    if (success === true) login(formData);
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-3/5 flex flex-col justify-center items-center p-8">
        <div className="max-w-sm w-full text-center">
          <img
            src={logo}  
            alt="Logo"
            className="mx-auto mb-4 w-24 h-24 object-contain"
          />
          <h1 className="text-3xl font-semibold mb-2">Welcome</h1>
          <p className="text-gray-500 mb-6">
            Log in with your credentials to access your account.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border bg-[#f8f8f8] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="relative">
              <label className="block text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border bg-[#f8f8f8] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 bottom-1 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-600">
                Remember Me
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging In..." : "Log In"}
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-600">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <div
        className="hidden md:block w-2/5 h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('src/assets/authpic.png')",
        }}
      ></div>
    </div>
  );
};

export default Login;
