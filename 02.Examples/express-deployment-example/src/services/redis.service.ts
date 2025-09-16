import redis from '../redis/redisClient';
import crypto from "crypto";

class RedisService {

    async buildCacheKey(prefix: string, query: Record<string, any>) {
        const hash = crypto
            .createHash("md5")
            .update(JSON.stringify(query))
            .digest("hex");
        return `${prefix}:${hash}`;
        }
    /**
     * Set a key-value pair with optional expiration time
     * @param key string
     * @param value string
     * @param expiryMode 'EX' for seconds, 'PX' for milliseconds
     * @param time number of seconds/milliseconds for expiration
     */
    async set(key: string, value: string, expireSeconds?: number): Promise<'OK' | null> {
        try {
            if (expireSeconds) {
                return await redis.set(key, value, 'EX', expireSeconds);
            }
            return await redis.set(key, value);
        } catch (error) {
            console.error('Redis SET Error:', error);
            return null;
        }
    }

    /**
     * Get value by key
     * @param key string
     */
    async get(key: string): Promise<string | null> {
        try {
            return await redis.get(key);
        } catch (error) {
            console.error('Redis GET Error:', error);
            return null;
        }
    }

    /**
     * Delete one or more keys
     * @param keys string[]
     */
    async del(...keys: string[]): Promise<number> {
        try {
            return await redis.del(keys);
        } catch (error) {
            console.error('Redis DEL Error:', error);
            return 0;
        }
    }

    /**
     * Check if a key exists
     * @param key string
     */
    async exists(key: string): Promise<number> {
        try {
            return await redis.exists(key);
        } catch (error) {
            console.error('Redis EXISTS Error:', error);
            return 0;
        }
    }

    /**
     * Set key expiration time
     * @param key string
     * @param seconds number
     */
    async expire(key: string, seconds: number): Promise<number> {
        try {
            return await redis.expire(key, seconds);
        } catch (error) {
            console.error('Redis EXPIRE Error:', error);
            return 0;
        }
    }

    /**
     * Get time to live for a key in seconds
     * @param key string
     */
    async ttl(key: string): Promise<number> {
        try {
            return await redis.ttl(key);
        } catch (error) {
            console.error('Redis TTL Error:', error);
            return -2; // Key does not exist
        }
    }

    /**
     * Increment a number stored at key
     * @param key string
     */
    async incr(key: string): Promise<number> {
        try {
            return await redis.incr(key);
        } catch (error) {
            console.error('Redis INCR Error:', error);
            return 0;
        }
    }

    /**
     * Add members to a set
     * @param key string
     * @param members string[]
     */
    async sadd(key: string, ...members: string[]): Promise<number> {
        try {
            return await redis.sadd(key, ...members);
        } catch (error) {
            console.error('Redis SADD Error:', error);
            return 0;
        }
    }

    /**
     * Get all members in a set
     * @param key string
     */
    async smembers(key: string): Promise<string[]> {
        try {
            return await redis.smembers(key);
        } catch (error) {
            console.error('Redis SMEMBERS Error:', error);
            return [];
        }
    }

    /**
     * Store hash fields
     * @param key string
     * @param data Record<string, string>
     */
    async hmset(key: string, data: Record<string, string>): Promise<'OK' | null> {
        try {
            return await redis.hmset(key, data);
        } catch (error) {
            console.error('Redis HMSET Error:', error);
            return null;
        }
    }

    /**
     * Get all hash fields
     * @param key string
     */
    async hgetall(key: string): Promise<Record<string, string>> {
        try {
            return await redis.hgetall(key);
        } catch (error) {
            console.error('Redis HGETALL Error:', error);
            return {};
        }
    }

    /**
     * Clear all data from Redis
     */
    async flushall(): Promise<'OK'> {
        try {
            return await redis.flushall();
        } catch (error) {
            console.error('Redis FLUSHALL Error:', error);
            return 'OK';
        }
    }
}

export default new RedisService();
