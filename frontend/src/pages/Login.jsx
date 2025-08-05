// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });

      const { user, token } = res.data;

      // Store user & token in localStorage/context
      login({ ...user, token });

      // Redirect to dashboard
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
          Login
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          className="w-full px-4 py-2 border rounded-lg mb-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full px-4 py-2 border rounded-lg mb-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Logging in..." : "Sign In"}
        </button>
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
