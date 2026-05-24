const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const { getTransactions } = require("../controllers/transactionController");

/**
 * @swagger
 * /api/transactions/all:
 *   get:
 *     summary: Get all transactions for the authenticated user
 *     responses:
 *       200:
 *         description: Transactions fetched successfully
 *       500:
 *         description: Server error
 */
router.get("/all", authMiddleware, getTransactions);

module.exports = router;
