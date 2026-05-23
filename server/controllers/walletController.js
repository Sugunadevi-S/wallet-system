const pool = require("../config/db");

// GET BALANCE
exports.getBalance = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Fetching balance for user ID:", userId);
    const result = await pool.query(
      "SELECT name,balance FROM users WHERE id=$1",
      [userId],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ name: result.rows[0].name, balance: result.rows[0].balance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ADD MONEY
exports.addMoney = async (req, res) => {
  try {
    const { amount } = req.body;
    await pool.query("UPDATE users SET balance = balance + $1 WHERE id=$2", [
      amount,
      req.user.id,
    ]);
    await pool.query(
      `INSERT INTO transactions (sender_id, receiver_id, type, amount)
       VALUES ($1, $2, $3, $4)`,
      [req.user.id, null, "ADD_MONEY", amount],
    );
    res.json({ message: "Money added" });
  } catch (error) {
    console.error("Error adding money:", error);
    res.status(500).json({ message: error.message });
  }
};
