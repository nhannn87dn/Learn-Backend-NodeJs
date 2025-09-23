#  Tìm hiểu về Unit Test

## 🔹 Unit Test là gì?

* **Unit Test** (kiểm thử đơn vị) là quá trình **kiểm thử những “đơn vị nhỏ nhất” trong code** (thường là function, method hoặc class).
* Mục tiêu: đảm bảo **mỗi đơn vị chạy đúng logic mong muốn** mà không phụ thuộc vào các thành phần khác.

Ví dụ trong dự án ExpressJS:

* Một **service function** `getUserById()` được coi là một unit.
* Một **controller method** `getUser(req, res)` cũng có thể coi là một unit.

---

## 🔹 Đặc điểm của Unit Test

1. **Nhỏ & độc lập**

   * Test chỉ tập trung vào **1 chức năng cụ thể**.
   * Không phụ thuộc database thật, API ngoài, hay hệ thống khác.

2. **Nhanh**

   * Vì không gọi network, không truy cập DB thật.
   * Thường chạy trong vài mili-giây.

3. **Dùng mock/stub**

   * Để thay thế các thành phần bên ngoài.
   * Ví dụ: test service thì **mock Model**; test controller thì **mock Service**.

---

## 🔹 Lợi ích của Unit Test

* **Phát hiện lỗi sớm**: kiểm tra logic ngay khi code, không cần đợi chạy toàn hệ thống.
* **Dễ bảo trì**: khi refactor code, test đảm bảo vẫn đúng.
* **Tài liệu sống**: đọc test cũng hiểu được code mong đợi làm gì.
* **Tăng độ tin cậy**: giúp yên tâm khi phát triển tính năng mới.

---

## 🔹 Unit Test với NodeJs 

Giả sử có hàm cộng:

```ts
function add(a: number, b: number) {
  return a + b;
}
```

Unit test với **Jest**:

```ts
test("add() should return correct sum", () => {
  expect(add(2, 3)).toBe(5);
});
```

* Đây là **unit test** vì nó kiểm tra **1 đơn vị nhỏ** (hàm `add`).
* Không cần DB, không cần API, chạy cực nhanh.

---

### Cách cài đặt Jest

1. Cài đặt Jest:

```bash
npm install --save-dev jest @types/jest ts-jest
```

1. Tạo file cấu hình Jest:

```bash
npx ts-jest config:init
```

1. Thêm script vào `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

1. Chạy test:

```bash
npm test
```

## 🔹 Unit Test trong ExpressJs

Ví dụ bạn có một dự án sử dụng Express với cấu trúc như sau:

```
src/
 ├─ controllers/
 │   └─ user.controller.ts
 ├─ services/
 │   └─ user.service.ts
 ├─ models/
 │   └─ user.model.ts
 └─ app.ts
__tests__/
 ├─ controllers/
 │   └─ user.controller.test.ts
 └─ services/
     └─ user.service.test.ts

```

Bạn cần test xem `controller`và `service` có hoạt động đúng như dự định không. Khi đó `Unit test` sẽ phát huy vai trò.

### Nguyên tắc test

- **Unit test Service**: test logic nghiệp vụ độc lập, mock Model.

- **Unit test Controller**: test request/response, mock Service.

- Dùng **Jest** (phổ biến, đơn giản cho Node/Express).

#### **📌 1. Unit test Service**

`services/user.service.test.ts`

```ts
import UserModel from "../models/user.model";

export async function getUserById(id: string) {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
```

User Service Unit Test

`services/user.service.test.ts`

```ts
import * as userService from "../../src/services/user.service";
import UserModel from "../../src/models/user.model";

// Mock UserModel
jest.mock("../models/user.model");

describe("UserService (function-based)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return user when found", async () => {
    const mockUser = { id: "1", name: "Tomy" };
    (UserModel.findById as jest.Mock).mockResolvedValue(mockUser);

    const result = await userService.getUserById("1");

    expect(result).toEqual(mockUser);
    expect(UserModel.findById).toHaveBeenCalledWith("1");
  });

  it("should throw error when user not found", async () => {
    (UserModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(userService.getUserById("1"))
      .rejects.toThrow("User not found");
  });
});
```
✅ Ở đây: Service test không quan tâm DB thật, chỉ mock Model

---

#### 2. 📌 Controller Unit Test

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

Viết unit test

`controllers/user.controller.test.ts`

```ts
import * as userController from "../../src/controllers/user.controller";
import * as userService from "../../src/services/user.service";

// Mock service
jest.mock("../../src/services/user.service");

describe("UserController (function-based)", () => {
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    mockReq = { params: { id: "1" } };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should return 200 and user data", async () => {
    (userService.getUserById as jest.Mock).mockResolvedValue({ id: "1", name: "Tomy" });

    await userController.getUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: "1", name: "Tomy" });
  });

  it("should return 404 if user not found", async () => {
    (userService.getUserById as jest.Mock).mockRejectedValue(new Error("User not found"));

    await userController.getUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "User not found" });
  });
});
```

---

## 🔹 Chạy Test

### Hướng dẫn chạy test

1. Đảm bảo đã cài đặt đầy đủ các package cần thiết:

```bash
npm install
```

2. Chạy toàn bộ test cases:

```bash
npm test
```

3. Chạy test với chi tiết hơn:

```bash
npm test -- --verbose
```

4. Chạy một file test cụ thể:

```bash
npm test -- path/to/test/file.test.ts
```

5. Chạy test và xem coverage:

```bash
npm test -- --coverage
```

6. Theo dõi các test đang chạy:

```bash
npm test -- --watch
```

## 🔹 Khi nào nên dùng Unit Test trong ExpressJS?

Bạn sử dụng Unit Test khi muốn đảm bảo:

1. **Kiểm tra logic nghiệp vụ (business logic) quan trọng**

   * Ví dụ: hàm tính giá đơn hàng, áp dụng discount, tính phí ship.
   * Đây là những đoạn code “cốt lõi” → cần chắc chắn luôn đúng.

2. **Controller mapping đúng input/output**

   * Kiểm tra: nhận đúng tham số `req.params`, `req.body`, gọi đúng Service, trả về `res.status / res.json`.

3. **Service hoạt động độc lập**

   * Ví dụ: `userService.getUserById()` cần xử lý đúng cả khi user tồn tại và khi không tồn tại.
   * Không cần DB thật → mock Model.

4. **Muốn refactor mà không sợ hỏng**

   * Khi thay đổi code, Unit Test sẽ cảnh báo nếu logic không còn đúng.

5. **Khi module/phần code có thể tách riêng**

   * Ví dụ: middleware validate JWT, helper format date, utility xử lý chuỗi → rất thích hợp để viết unit test.

---

## 🔹 Khi nào **không nhất thiết** phải dùng Unit Test?

* Dự án **nhỏ, prototype, MVP** → có thể skip để tiết kiệm thời gian.
* Chỉ viết test cho những đoạn code **rõ ràng, ít rủi ro** (ví dụ: route trả về chuỗi `"Hello World"`).
* Trường hợp cần kiểm tra toàn bộ luồng request → nên dùng **Integration Test / E2E Test** thay vì unit test.
