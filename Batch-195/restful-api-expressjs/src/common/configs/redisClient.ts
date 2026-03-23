import Redis from "ioredis";

const redisClient = new Redis({
  host: "127.0.0.1", // địa chỉ Redis server
  port: 6379,        // cổng mặc định
  // password: "your_password_if_any",
  retryStrategy: (times) => Math.min(times * 50, 2000) // auto reconnect
});

redisClient.on("connect", () => console.log("✅ Redis connected"));
redisClient.on("error", (err) => console.error("❌ Redis error", err));

export default redisClient;