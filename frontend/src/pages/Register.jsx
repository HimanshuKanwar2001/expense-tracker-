// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axiosInstance";

const Register = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
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
      const res = await axios.post("/auth/register", {
        email,
        password,
        role,
      });

      const { user, token } = res.data;

      // Store token and user info in context/localStorage
      login({ ...user, token });

      // Redirect to dashboard
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Registration failed. Try again."
      );
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
          Register
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
          className="w-full px-4 py-2 border rounded-lg mb-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="w-full px-4 py-2 border rounded-lg mb-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="read-only">Read Only</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">
  Do you have an account?{" "}
  <a
    href="/Login"
    className="text-indigo-600 hover:underline dark:text-indigo-400"
  >
    Login here
  </a>
</p>
      </form>
    </div>
  );
};

export default Register;
