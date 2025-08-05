import pool from "../config/db.js";

export const createTransaction = async (data) => {
  const { user_id, type, amount, category, description, date } = data;
  const result = await pool.query(
    `INSERT INTO transactions (user_id, type, amount, category, description,date) 
     VALUES ($1, $2, $3, $4, $5,$6) RETURNING *`,
    [user_id, type, amount, category, description, date]
  );
  return result.rows[0];
};

export const getUserTransactions = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC`,
    [user_id]
  );
  return result.rows;
};

export const getTransactionById = async (id) => {
  const result = await pool.query(`SELECT * FROM transactions WHERE id = $1`, [
    id,
  ]);
  return result.rows[0];
};

export const updateTransaction = async (id, user_id, data) => {
  const { type, amount, category, description } = data;
  const result = await pool.query(
    `UPDATE transactions SET type = $1, amount = $2, category = $3, description = $4
     WHERE id = $5 AND user_id = $6 RETURNING *`,
    [type, amount, category, description, id, user_id]
  );
  return result.rows[0];
};

export const deleteTransaction = async (id, user_id) => {
  const result = await pool.query(
    `DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *`,
    [id, user_id]
  );
  return result.rows[0];
};
