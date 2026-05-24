const pool = require("../config/db");

// GET BALANCE
exports.getBalance = async (req, res) => {
  try {
    const userId = req.user.id;
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

// TRANSFER MONEY
exports.transferMoney = async (req, res) => {
  const client = await pool.connect();

  try {
    const { receiverEmail, amount } = req.body;

    await client.query("BEGIN");

    // Sender
    const sender = await client.query("SELECT * FROM users WHERE id=$1", [
      req.user.id,
    ]);

    // Receiver
    const receiver = await client.query("SELECT * FROM users WHERE email=$1", [
      receiverEmail,
    ]);

    // 1. Receiver not found
    if (receiver.rows.length === 0) {
      return res.status(400).json({
        message: "Receiver not found",
      });
    }

    // 2. Cannot transfer to self
    if (sender.rows[0].email === receiverEmail) {
      return res.status(400).json({
        message: "You cannot transfer money to yourself",
      });
    }

    // 3. Amount must be greater than 0
    if (Number(amount) <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than zero",
      });
    }

    // 4. Insufficient balance
    if (Number(sender.rows[0].balance) < Number(amount)) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    // Deduct sender balance
    await client.query("UPDATE users SET balance = balance - $1 WHERE id=$2", [
      amount,
      req.user.id,
    ]);

    // Add receiver balance
    await client.query("UPDATE users SET balance = balance + $1 WHERE id=$2", [
      amount,
      receiver.rows[0].id,
    ]);

    // Insert transaction
    await client.query(
      `INSERT INTO transactions
      (sender_id, receiver_id, type, amount)
      VALUES ($1, $2, $3, $4)`,
      [req.user.id, receiver.rows[0].id, "TRANSFER", amount],
    );

    await client.query("COMMIT");

    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    await client.query("ROLLBACK");

    res.status(500).json({
      message: error.message,
    });
  } finally {
    client.release();
  }
};
