const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getBalance,
  addMoney,
  transferMoney,
} = require("../controllers/walletController");

/**
 * @swagger
 * /api/wallet/balance:
 *   get:
 *     summary: Get wallet balance
 *     responses:
 *       200:
 *         description: Wallet balance fetched successfully
 */
router.get("/balance", authMiddleware, getBalance);
/**
 * @swagger
 * /api/wallet/add-money:
 *   post:
 *     summary: Add money to wallet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Money added successfully
 */

router.post("/add-money", authMiddleware, addMoney);
/**
 * @swagger
 * /api/wallet/transfer:
 *   post:
 *     summary: Transfer money
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               receiverId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transfer successful
 */

router.post("/transfer", authMiddleware, transferMoney);

module.exports = router;
