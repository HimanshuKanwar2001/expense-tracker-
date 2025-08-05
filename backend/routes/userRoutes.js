import express from "express";
import { fetchAllUsers, updateUserRole } from "../controllers/userController.js";
import {
  authenticateUser,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticateUser);

// Only admins can access this
router.get("/", authorizeRoles("admin"), fetchAllUsers);
router.patch("/role", authorizeRoles("admin"), updateUserRole);

export default router;
