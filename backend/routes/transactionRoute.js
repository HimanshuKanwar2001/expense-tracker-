import express from "express";
import {
  addTransaction,
  getTransactions,
  editTransaction,
  removeTransaction,
} from "../controllers/transactionController.js";

import {
  authenticateUser,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticateUser);

// Read access for all roles
router.get("/", getTransactions);

// Admin and user only
router.post("/", authorizeRoles("admin", "user"), addTransaction);
router.put("/:id", authorizeRoles("admin", "user"), editTransaction);
router.delete("/:id", authorizeRoles("admin", "user"), removeTransaction);

export default router;
