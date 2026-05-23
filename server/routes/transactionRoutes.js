const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const { getTransactions } = require("../controllers/transactionController");

router.get("/all", authMiddleware, getTransactions);

module.exports = router;
