import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import "aos/dist/aos.css";
import AOS from "aos";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const success = await authenticateUser(email, password);
      if (success) {
        navigate("/dashboard", { replace: true });
      } else {
        setError("Invalid credentials or authentication failed");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
        data-aos="fade-up"
      >
        <img
          src="/src/assets/image/huboweb.png"
          alt="Huboweb Logo"
          className="mx-auto mb-4 h-12"
          data-aos="fade-down"
        />
        <h2 className="text-2xl font-semibold text-center text-gray-800" data-aos="fade-down">
          Login
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4 relative" data-aos="fade-right">
            <User
              className={`absolute left-3 top-3 w-5 h-5 transition-colors duration-300 ${
                isEmailFocused ? "text-blue-500" : "text-gray-400"
              }`}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              required
            />
          </div>

          <div className="mb-4 relative" data-aos="fade-left">
            <Lock
              className={`absolute left-3 top-3 w-5 h-5 transition-colors duration-300 ${
                isPasswordFocused ? "text-blue-500" : "text-gray-400"
              }`}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-b from-[#1E3A8A] to-[#4891E4] text-white p-3 rounded-lg transition duration-300 hover:opacity-90 disabled:opacity-70"
            data-aos="zoom-in"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
