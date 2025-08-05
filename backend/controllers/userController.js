import pool from "../config/db.js";
import { getAllUsers } from "../models/userModel.js";

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve users", error: err.message });
  }
};

export const updateUserRole = async (req, res) => {
  const { userId, role } = req.body;

  if (!["admin", "user","read-only"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    await pool.query("UPDATE users SET role = $1 WHERE id = $2", [
      role,
      userId,
    ]);

    res.json({ message: "User role updated successfully" });
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
