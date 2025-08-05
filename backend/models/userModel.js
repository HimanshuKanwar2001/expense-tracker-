import pool from "../config/db.js";

export const createUser = async ({ email, password, role }) => {
  const result = await pool.query(
    "INSERT INTO users(email,password,role) VALUES($1,$2,$3) RETURNING *",
    [email, password, role]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);

  return result.rows[0];
};

export const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, email, role, created_at FROM users ORDER BY created_at DESC`
  );
  return result.rows;
};
