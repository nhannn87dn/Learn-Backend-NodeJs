import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379"),
});

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

redis.on("ready", () => {
  console.log("✅ Redis ready to accept commands");
});

redis.on("reconnecting", () => {
  console.log("🔄 Redis reconnecting...");
});

export default redis;
