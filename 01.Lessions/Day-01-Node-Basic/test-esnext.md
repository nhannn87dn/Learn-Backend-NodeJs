# JavaScript ESNext 

## Bài 1: Chuẩn Hóa và Gộp Cấu Hình Hệ Thống

**1. Dữ liệu ban đầu:**

```javascript
const defaultConfig = { 
  theme: 'light', 
  showSidebar: true, 
  timeout: 3000, 
  version: '1.0.0' 
};

const userConfig = { 
  apiKey: 'secret-key-123', 
  timeout: 5000 
};

```

**2. Dựa vào kiến thức:**

* **Object Destructuring** (Phân rã object)
* **Spread Operator** (`...`)
* **Default Values** (Giá trị mặc định cho thuộc tính)

**3. Yêu cầu:**

* Viết hàm `mergeConfig(defaultConfig, userConfig)` trả về một cấu hình mới.
* Ưu tiên áp dụng thuộc tính của `userConfig` đè lên `defaultConfig`. Nếu `theme` trong `userConfig` không được định nghĩa, mặc định chọn `"light"`.
* Bóc tách riêng 2 thuộc tính `apiKey` và `version` nằm ở cấp ngoài cùng của object trả về, tất cả các thuộc tính còn lại gộp gọn vào một object con đặt tên là `settings`.

---

## Bài 2: Thống Kê Điểm Số Linh Hoạt

**1. Dữ liệu ban đầu:**

```javascript
// Dữ liệu tham số đầu vào linh hoạt (số lượng điểm không cố định)
// Ví dụ 1: analyzeScores("Toán", 8.5, 9.0, 6.5, 7.0, 10.0)
// Ví dụ 2: analyzeScores("Văn", 7.0, 8.0)

```

**2. Dựa vào kiến thức:**

* **Rest Parameters** (`...scores`)
* **Arrow Functions**
* **ES6+ Array Methods** (`reduce`, `Math.max`, `Math.min`)

**3. Yêu cầu:**

* Viết hàm `analyzeScores(subjectName, ...scores)` nhận tham số đầu tiên là tên môn học và các tham số tiếp theo là các con điểm.
* Không dùng vòng lặp `for`, `while` truyền thống.
* Trả về object có dạng:
```javascript
{
  subject: "Toán",
  totalStudents: 5,
  highest: 10.0,
  lowest: 6.5,
  average: 8.2 // Làm tròn 2 chữ số thập phân
}

```



---

## Bài 3: Bóc Tách Dữ Liệu An Toàn Từ Payload API

**1. Dữ liệu ban đầu:**

```javascript
const responseComplete = {
  user: {
    profile: { fullName: "Nguyễn Văn A", avatar: { url: "https://img.com/a.png" } },
    notifications: { unreadCount: 0 }
  }
};

const responseIncomplete = {
  user: {
    profile: null
  }
};

```

**2. Dựa vào kiến thức:**

* **Optional Chaining** (`?.`)
* **Nullish Coalescing Operator** (`??`)
* **Nested Destructuring**

**3. Yêu cầu:**

* Viết hàm `getUserDisplayInfo(apiResponse)` trích xuất thông tin an toàn, không làm ứng dụng bị văng lỗi (`TypeError`).
* `name`: Lấy từ `profile.fullName`, nếu thiếu thì lấy mặc định `"Khách"`.
* `avatar`: Lấy từ `profile.avatar.url`, nếu thiếu thì lấy mặc định `"/assets/default-avatar.png"`.
* `unreadMessages`: Lấy từ `notifications.unreadCount`. Nếu bằng `0` phải giữ nguyên `0` (không dùng toán tử `||` vì sẽ biến `0` thành giá trị mặc định), nếu `null`/`undefined` mới lấy `0`.

---

## Bài 4: Xây Dựng Template Dịch Thuật (i18n Tagged Template)

**1. Dữ liệu ban đầu:**

```javascript
const dictionary = {
  hello: "Xin chào",
  welcome: "chào mừng bạn quay trở lại",
  items: "sản phẩm"
};

const action = "hello";
const name = "Alex";
const count = 5;
const entity = "items";

```

**2. Dựa vào kiến thức:**

* **Tagged Template Literals**

**3. Yêu cầu:**

* Viết một tagged function tên là `i18n(strings, ...keys)`.
* Hàm nhận vào các chuỗi tĩnh và danh sách các biến trong template string.
* Nếu giá trị của biến là một từ khóa tồn tại trong `dictionary`, hãy thay thế bằng từ tiếng Việt tương ứng. Ngược lại (hoặc nếu là số/tên riêng như "Alex"), giữ nguyên giá trị.
* Kết quả chạy lệnh `i18n`${action} ${name}, ${'welcome'}! Bạn có ${count} ${entity}.`` phải trả về: `"Xin chào Alex, chào mừng bạn quay trở lại! Bạn có 5 sản phẩm."`.

---

## Bài 5: Encapsulation Quản Lý Tài Khoản Ngân Hàng

**1. Dữ liệu ban đầu:**

```javascript
// Các giao dịch nạp/rút tiền của người dùng
const myAccount = new BankAccount("Nguyễn Văn B", 1000000);

```

**2. Dựa vào kiến thức:**

* **ES6+ Classes**
* **Private Fields** (`#balance`, `#transactionHistory`)
* **Private Methods** (`#logTransaction`)
* **Getters**

**3. Yêu cầu:**

* Tạo class `BankAccount` có private fields `#balance` (lưu số dư) và `#transactionHistory` (lưu mảng lịch sử).
* Tạo private method `#logTransaction(type, amount)` tự động thêm object `{ type, amount, date: new Date() }` vào lịch sử.
* Định nghĩa các phương thức `deposit(amount)` (nạp tiền) và `withdraw(amount)` (rút tiền có kiểm tra đủ số dư hay không). Khi thực hiện thành công phải tự gọi `#logTransaction`.
* Tạo getter `balance` trả về chuỗi tiền tệ định dạng VND (VD: `1,000,000 VNĐ`).
* Tạo phương thức `getHistory()` trả về một **bản sao (shallow copy)** của `#transactionHistory` để tránh việc dữ liệu bên trong bị chỉnh sửa từ bên ngoài.

---

## Bài 6: Dynamic State & Action Creator

**1. Dữ liệu ban đầu:**

```javascript
const initialState = { user: "An", role: "admin" };
const targetKey = "theme";
const targetValue = "dark";

```

**2. Dựa vào kiến thức:**

* **Computed Property Names** (`[key]`)
* **Property Value Shorthand**
* **Immutability (Tính bất biến)**

**3. Yêu cầu:**

* Viết hàm `updateState(currentState, key, value)` cập nhật thuộc tính động `key` với giá trị `value` vào state mà không làm thay đổi (`mutate`) `currentState` ban đầu (phải trả về một object hoàn toàn mới).
* Viết hàm `createAction(type, payload)` sử dụng **Property Value Shorthand** để trả về object theo cấu trúc `{ type, payload, timestamp: Date.now() }`.

---

## Bài 7: Phân Tách và Hoán Đổi Hạng Thi Đấu

**1. Dữ liệu ban đầu:**

```javascript
const leaderboard = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank"];

```

**2. Dựa vào kiến thức:**

* **Array Destructuring**
* **Rest Element in Destructuring** (`...others`)
* **Variable Swapping** (Tráo đổi giá trị biến)

**3. Yêu cầu:**

* Dùng **Array Destructuring** trích xuất vận động viên hạng nhất vào biến `gold`, hạng nhì vào biến `silver`, và gom tất cả các vận động viên còn lại vào mảng `others`.
* Khi có sự cố đổi hạng giữa `gold` và `silver`, sử dụng cú pháp hoán đổi giá trị biến của ES6 để tráo đổi giá trị của `gold` và `silver` chỉ trong **1 dòng code** duy nhất.

---

## Bài 8: Xây Dựng Numeric Range Generator

**1. Dữ liệu ban đầu:**

```javascript
// Phạm vi số cần tạo từ 1 đến 10, bước nhảy là 2
// Tham số: start = 1, end = 10, step = 2

```

**2. Dựa vào kiến thức:**

* **Generator Functions** (`function*` và `yield`)
* **Symbol.iterator**

**3. Yêu cầu:**

* Viết hàm `createRange(start, end, step = 1)` bằng Generator Function.
* Kết quả trả về phải là một Iterable cho phép:
1. Duyệt trực tiếp qua vòng lặp `for...of`.
2. Chuyển đổi nhanh thành mảng bằng Spread Operator (`[...createRange(1, 10, 2)]`).



---

## Bài 9: Cache Dữ Liệu Tự Động Giải Phóng Bộ Nhớ

**1. Dữ liệu ban đầu:**

```javascript
let userObj = { id: 101, name: "Thành" };
const METADATA_KEY = Symbol("user_session_info");
const sessionData = { token: "abcxyz", loggedInAt: Date.now() };

```

**2. Dựa vào kiến thức:**

* **WeakMap** (Quản lý bộ nhớ tối ưu cho Object)
* **Symbol** (Tạo identifier độc nhất)

**3. Yêu cầu:**

* Xây dựng class `MetadataStore` chứa một `WeakMap` nội bộ.
* Viết các phương thức:
* `setMetadata(obj, keySymbol, data)`
* `getMetadata(obj, keySymbol)`
* `hasMetadata(obj, keySymbol)`


* Đảm bảo rằng khi `userObj` bị gán bằng `null` (giải phóng bộ nhớ), các dữ liệu metadata liên quan trong `MetadataStore` cũng tự động được Garbage Collector giải phóng.

---

## Bài 10: Xử Lý Chuỗi Dữ Liệu Dạng Pipeline

**1. Dữ liệu ban đầu:**

```javascript
const rawTitle = "   Học JavaScript ESNext Thật Là Dễ!   ";

// Các hàm xử lý đơn lẻ:
const trim = str => str.trim();
const lowerCase = str => str.toLowerCase();
const replaceSpaces = str => str.replace(/\s+/g, '-');
const addPrefix = str => `slug-${str}`;

```

**2. Dựa vào kiến thức:**

* **Rest Parameters**
* **Higher-Order Functions**
* **Array.prototype.reduce**

**3. Yêu cầu:**

* Viết hàm `pipe(...fns)` nhận vào danh sách các hàm xử lý bất kỳ và trả về một hàm tích hợp duy nhất.
* Khi gọi hàm tích hợp này với tham số `rawTitle`, dữ liệu sẽ lần lượt chạy qua các hàm từ **trái sang phải**.
* Kết quả kiểm thử: `const generateSlug = pipe(trim, lowerCase, replaceSpaces, addPrefix);` khi truyền `rawTitle` phải trả về chuỗi `"slug-học-javascript-esnext-thật-là-dễ!"`.