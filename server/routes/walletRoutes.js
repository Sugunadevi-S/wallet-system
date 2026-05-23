const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getBalance,
  addMoney,
  transferMoney,
} = require("../controllers/walletController");

router.get("/balance", authMiddleware, getBalance);
router.post("/add-money", authMiddleware, addMoney);
router.post("/transfer", authMiddleware, transferMoney);

module.exports = router;
