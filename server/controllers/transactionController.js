const pool = require("../config/db");

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await pool.query(
      `SELECT * FROM transactions
       WHERE sender_id = $1
       OR receiver_id = $1
       ORDER BY created_at DESC`,
      [req.user.id],
    );
    res.json(transactions.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
