import pool from "../config/db.js";

export const getIncomeExpenseSummary = async (user_id) => {
  const result = await pool.query(
    `
    SELECT type, SUM(amount) AS total
    FROM transactions
    WHERE user_id = $1
    GROUP BY type
  `,
    [user_id]
  );
  return result.rows;
};

export const getMonthlyTrend = async (user_id) => {
  const result = await pool.query(
    `
    SELECT TO_CHAR(date, 'YYYY-MM-DD') AS month, type, SUM(amount) AS total
    FROM transactions
    WHERE user_id = $1
    GROUP BY month, type
    ORDER BY month
  `,
    [user_id]
  );
  return result.rows;
};

export const getCategoryBreakdown = async (user_id) => {
  const result = await pool.query(
    `
    SELECT category, SUM(amount) AS total
    FROM transactions
    WHERE user_id = $1
    GROUP BY category
  `,
    [user_id]
  );
  return result.rows;
};
