const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use main routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/wallet", require("./routes/walletRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
