# Caching with Redis


## 🔹 **Caching là gì ?**

* **Caching** là kỹ thuật **lưu trữ tạm thời dữ liệu** ở một nơi có tốc độ truy xuất nhanh hơn (bộ nhớ RAM hoặc bộ nhớ gần ứng dụng) để tránh việc phải tính toán hoặc truy vấn lại dữ liệu từ nguồn gốc (ví dụ: database).
* Khi một request đến:

  1. Ứng dụng **kiểm tra cache** xem dữ liệu đã tồn tại chưa.
  2. Nếu có (cache hit) → lấy từ cache, trả về ngay cho client → rất nhanh.
  3. Nếu chưa có (cache miss) → truy vấn database → lưu kết quả vào cache → trả về cho client.

👉 Lợi ích:

* **Giảm tải cho database** (ít truy vấn lặp lại).
* **Tăng tốc độ phản hồi API** (vì đọc RAM nhanh hơn đọc DB).
* **Tiết kiệm chi phí hạ tầng** (database không phải xử lý quá nhiều).

Ví dụ thực tế:

* Một trang eCommerce có endpoint `GET /products`. Danh sách sản phẩm ít thay đổi, nhưng mỗi ngày có hàng ngàn lượt truy cập. Nếu dùng cache, bạn có thể lưu danh sách sản phẩm vào RAM trong 5 phút thay vì query DB liên tục.

**Caching** = Kỹ thuật tăng tốc bằng cách lưu dữ liệu tạm.

---

## 🔹 **Redis là gì ?**

* **Redis** (Remote Dictionary Server) là một **cơ sở dữ liệu NoSQL lưu trữ trên bộ nhớ (in-memory database)**, hoạt động cực nhanh.
* Redis thường được dùng làm **cache layer** trong các hệ thống backend, nhưng ngoài caching, Redis còn hỗ trợ:

  * **Pub/Sub** (truyền thông điệp theo cơ chế publish/subscribe).
  * **Session store** (lưu session người dùng).
  * **Rate limiting** (giới hạn request API).
  * **Queue system** (hàng đợi công việc).

👉 Đặc điểm chính của Redis:

* Lưu dữ liệu trong **RAM** → tốc độ **micro giây**.
* Hỗ trợ nhiều kiểu dữ liệu: `string`, `list`, `set`, `hash`, `sorted set`, `bitmap`, `stream`.
* Có thể **persist dữ liệu** xuống ổ cứng để khởi động lại không bị mất.
* Phổ biến trong **Node.js + ExpressJS** để cache API response hoặc token.

Ví dụ sử dụng:

* Khi người dùng gọi API `GET /users/:id`, bạn có thể:

  1. Check dữ liệu trong Redis (`user:123`).
  2. Nếu có → trả về ngay.
  3. Nếu chưa có → query DB, sau đó `SET user:123 value EX 60` (lưu trong 60 giây).

* **Redis** = Công cụ mạnh mẽ nhất để làm cache trong Node.js/ExpressJS (ngoài ra có thể dùng Memcached, nhưng Redis phổ biến và đa năng hơn).

---

## 🔹Khi nào cần áp dụng kỹ thật Caching ?

Không phải lúc nào cũng cần caching, nếu lạm dụng có thể gây phức tạp. Bạn cần áp dụng trong những tình huống sau:

### 🔹 1. Khi dữ liệu **ít thay đổi** nhưng được **truy cập nhiều lần**

* Ví dụ: danh sách sản phẩm, bài viết, danh mục, thông tin user profile.
* Database không cần bị query lặp đi lặp lại.
  👉 Đây là trường hợp điển hình để dùng caching.

---

### 🔹 2. Khi truy vấn database hoặc API bên ngoài **tốn nhiều tài nguyên / thời gian**

* Một số query phức tạp có `JOIN`, `GROUP BY` hoặc tính toán nặng.
* Gọi API bên ngoài (third-party API) thường chậm và giới hạn request.
  👉 Lưu kết quả vào cache sẽ tiết kiệm chi phí và giảm độ trễ.

---

### 🔹 3. Khi hệ thống có **lưu lượng truy cập lớn**

* Ứng dụng eCommerce, mạng xã hội, báo điện tử, hoặc API public.
* Caching giúp giảm áp lực cho DB → hệ thống chịu tải tốt hơn.

---

### 🔹 4. Khi cần **giảm độ trễ phản hồi (latency)**

* Cache thường nằm trong RAM → truy cập nhanh hơn database hàng chục, hàng trăm lần.
* Nếu yêu cầu người dùng cần **real-time experience** (ví dụ hiển thị dashboard, live score, trending posts), caching giúp phản hồi tức thì.

---

### 🔹 5. Khi dữ liệu có thể **chấp nhận cũ đi một chút (eventual consistency)**

* Nếu dữ liệu không cần phải luôn **mới nhất theo thời gian thực** thì có thể cache.
* Ví dụ: trending posts trong 1 phút, danh sách sản phẩm trong 5 phút, tỉ giá tiền tệ trong 10 phút.

---

### 🔹 6. Khi cần **tối ưu chi phí hạ tầng**

* DB server (MySQL, MongoDB, PostgreSQL) rất tốn kém khi scale.
* Redis cache có thể giảm số query DB tới 70–90%, giúp tiết kiệm chi phí server.

---

### ❌ Khi **không nên caching**

* Dữ liệu **thay đổi liên tục** và cần real-time chính xác (ví dụ: số dư tài khoản ngân hàng, giỏ hàng khi checkout).
* Dữ liệu **cá nhân hóa cao** cho từng user (khó tái sử dụng cache).
* Khi hệ thống còn nhỏ, DB chưa bị quá tải → thêm cache chỉ làm phức tạp.

---


## 🔹 1. Cài đặt Redis

Cài đặt Redis server với docker composer:

Tạo file `docker-compose.yml` cùng cấp với `package.json`:

```yaml
version: '3.8'

services:
  redis:
    image: redis:7-alpine
    container_name: redis_cache
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: always
    command: redis-server --appendonly yes

volumes:
  redis_data:
```

Chạy Redis server:

```bash
docker-compose up -d
```

Cài đặt thư viện Redis client cho Node.js:

```bash
npm install ioredis
```

---

## 🔹 2. Tạo Redis client với ioredis

📂 `src/config/redisClient.ts`

```ts
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
```

---

## 🔹 3. Service: UserService với cache

📂 `src/services/user.service.ts`

```ts
import UserModel from "../models/user.model";
import redisClient from "../config/redisClient";

const CACHE_TTL = 60; // cache 60 giây

export async function getUserById(id: string) {
  const cacheKey = `user:${id}`;

  // 1. Kiểm tra cache
  const cachedUser = await redisClient.get(cacheKey);
  if (cachedUser) {
    console.log("⚡ Cache hit");
    return JSON.parse(cachedUser);
  }

  // 2. Query MongoDB
  console.log("🐢 Cache miss - query MongoDB");
  const user = await UserModel.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  // 3. Lưu vào cache với TTL
  await redisClient.set(cacheKey, JSON.stringify(user), "EX", CACHE_TTL);

  return user;
}

// Hàm update có invalidate cache
export async function updateUser(id: string, data: any) {
  const updatedUser = await UserModel.findByIdAndUpdate(id, data, { new: true });

  if (!updatedUser) {
    throw new Error("User not found");
  }

  // Xóa cache để đảm bảo lần sau lấy DB mới
  await redisClient.del(`user:${id}`);

  return updatedUser;
}
```

---

## 🔹 4. Controller

📂 `src/controllers/user.controller.ts`

```ts
import { Request, Response } from "express";
import * as userService from "../services/user.service";

export async function getUser(req: Request, res: Response) {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
}
```

---

## 🔹 5. Routes

📂 `src/routes/user.routes.ts`

```ts
import { Router } from "express";
import { getUser, updateUser } from "../controllers/user.controller";

const router = Router();

router.get("/:id", getUser);
router.put("/:id", updateUser);

export default router;
```

---

## 🔹 6. App setup

📂 `src/app.ts`

```ts
import express from "express";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

export default app;
```

---

## 🔹 7. Luồng hoạt động

1. **GET /users/\:id**

   * Lần đầu: **Cache miss** → query MongoDB → lưu vào Redis.
   * Lần sau: **Cache hit** → trả từ Redis (rất nhanh).

2. **PUT /users/\:id**

   * Cập nhật MongoDB.
   * Xóa cache Redis (`del user:id`) để đảm bảo dữ liệu lần sau là mới nhất.


