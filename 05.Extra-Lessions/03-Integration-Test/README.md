# Integration Test với SuperTest


Rất hay 👍. Ta đã có **User Service + Controller** function-based, giờ mình sẽ giới thiệu **Integration Test** và cách áp dụng với **SuperTest** trong ExpressJS.

---

## 🔹 **Integration Test là gì?**

* **Unit test**: chỉ kiểm tra 1 đơn vị nhỏ (function/service), cô lập hoàn toàn.
* **Integration test**: kiểm tra **nhiều thành phần kết hợp** với nhau, ví dụ:

  * Route → Controller → Service → Database (hoặc mock DB).
  * Đảm bảo các module kết nối đúng và request API trả ra như mong đợi.

👉 Nói ngắn gọn: **Integration test mô phỏng request thật vào API** thay vì chỉ test riêng lẻ logic.

---

## 🔹 **Cách áp dụng trong ExpressJS với SuperTest**

### 1. Cài đặt thư viện

```bash
npm install --save-dev supertest jest ts-jest @types/jest @types/supertest
```

### 2. Cấu hình Jest (nếu dùng TypeScript)

`jest.config.js`

```js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};
```

---

### 3. Ví dụ User Service + Controller (function-based)

`services/user.service.ts`

```ts
// Service giả lập DB
const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" }
];

export async function getUserById(id: string) {
  const user = users.find(u => u.id === id);
  if (!user) throw new Error("User not found");
  return user;
}
```

`controllers/user.controller.ts`

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
```

`routes/user.routes.ts`

```ts
import { Router } from "express";
import { getUser } from "../controllers/user.controller";

const router = Router();
router.get("/:id", getUser);

export default router;
```

`app.ts`

```ts
import express from "express";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

export default app;
```

---

### 4. Integration Test với SuperTest

`tests/user.int.test.ts`

```ts
import request from "supertest";
import app from "../app";

describe("Integration Test - User API", () => {
  it("GET /users/:id - trả về user khi tồn tại", async () => {
    const res = await request(app).get("/users/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: "1",
      name: "Alice",
      email: "alice@example.com"
    });
  });

  it("GET /users/:id - trả về 404 khi không tồn tại", async () => {
    const res = await request(app).get("/users/999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "User not found");
  });
});
```

---

### 5. Chạy test

```bash
npx jest
```

✅ Kết quả: SuperTest sẽ gửi request HTTP giả lập vào app ExpressJS, đi qua route → controller → service → mock DB, và kiểm tra response.

---

## 📌 So sánh nhanh

* **Unit test**: test `getUserById()` trả về đúng object.
* **Integration test**: test `GET /users/:id` → có đúng JSON + HTTP status không.

---
