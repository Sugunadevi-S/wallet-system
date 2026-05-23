const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const { getBalance, addMoney } = require("../controllers/walletController");

router.get("/balance", authMiddleware, getBalance);
router.post("/add-money", authMiddleware, addMoney);

module.exports = router;
