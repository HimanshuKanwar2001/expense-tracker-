import express from "express";
import { register, login, getUser, getUserRoleByEmail } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.get("/me", verifyToken, getUser); // use GET and verifyToken
router.post("/login", login);
router.post("/role", getUserRoleByEmail);

export default router;
