import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findUserByEmail } from "../models/userModel.js";
dotenv.config();

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  console.log("Token:", token);
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findUserByEmail(decoded.email);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
