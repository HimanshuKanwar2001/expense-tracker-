import express from "express";
import helmet from "helmet";
// import xss from "xss-clean";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoute.js";
import analyticsRoutes from "./routes/analyticsRoute.js";
import { global as globalRateLimiter } from "./middlewares/rateLimiter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
// app.use(xss());
app.use(morgan("dev"));

app.use(globalRateLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/users", userRoutes);

export default app;
