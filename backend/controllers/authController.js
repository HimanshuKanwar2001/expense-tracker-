import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../models/userModel.js";
import { generateToken } from "../utils/jwt.js";
import pool from "../config/db.js";

export const register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      email,
      password: hashedPassword,
      role: role || "user",
    });
    const token = generateToken(newUser);

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const getUserRoleByEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const result = await pool.query("SELECT role FROM users WHERE email = $1", [
      email,
    ]);
    console.log(result.rows);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const role = result.rows[0].role;

    let allowedRoles = [];

    if (role === "admin") {
      allowedRoles = ["admin", "user", "read-only"];
    } else if (role === "user") {
      allowedRoles = ["user", "read-only"];
    } else if (role === "read-only") {
      allowedRoles = ["read-only"];
    }

    res.status(200).json({ registeredRole: role, allowedRoles });
  } catch (err) {
    console.error("Error fetching role:", err.message);
    res.status(500).json({ message: "Server error while fetching role." });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = req.user; // From verifyToken middleware
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error getting user", error });
  }
};

// export const getUser = async (req, res) => {
//   try {
//     // req.user is set by the middleware
//     res.status(200).json({ user: req.user });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to get user", error });
//   }
// };
