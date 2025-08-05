import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true, // Important for Upstash
  },
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.connect().catch(console.error);

export default redisClient;
