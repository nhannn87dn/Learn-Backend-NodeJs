# MongoDB and Mongoose

![mongodb](https://images.viblo.asia/29322fc4-a1b0-4416-9dce-0d4b34843cf6.png)

## 💛 MongoDB là gì ?

- MongoDB là một hệ quản trị cơ sở dữ liệu mã nguồn mở, là CSDL thuộc NoSql và được hàng triệu người sử dụng.
- MongoDB là một database hướng tài liệu (document), các dữ liệu được lưu trữ trong document kiểu JSON thay vì dạng bảng như CSDL quan hệ nên truy vấn sẽ rất nhanh.
- Với CSDL quan hệ chúng ta có khái niệm bảng, các cơ sở dữ liệu quan hệ (như MySQL hay SQL Server...) sử dụng các bảng để lưu dữ liệu thì với MongoDB chúng ta sẽ dùng khái niệm là collection thay vì bảng
- So với RDBMS thì trong MongoDB collection ứng với table, còn document sẽ ứng với row , MongoDB sẽ dùng các document thay cho row trong RDBMS.
- Các collection trong MongoDB được cấu trúc rất linh hoạt, cho phép các dữ liệu lưu trữ không cần tuân theo một cấu trúc nhất định.
- Thông tin liên quan được lưu trữ cùng nhau để truy cập truy vấn nhanh thông qua ngôn ngữ truy vấn MongoDB

## 💛 Ưu điểm của mongoDB

- Dữ liệu lưu trữ phi cấu trúc, không có tính ràng buộc, toàn vẹn nên tính sẵn sàng cao, hiệu suất lớn và dễ dàng mở rộng lưu trữ.
- Dữ liệu được caching (ghi đệm) lên RAM, hạn chế truy cập vào ổ cứng nên tốc độ đọc và ghi cao

## 💛 Nhược điểm của MongoDB

- Không ứng dụng được cho các mô hình giao dịch nào có yêu cầu độ chính xác cao do không có ràng buộc.
- Không có cơ chế transaction (giao dịch) để phục vụ các ứng dụng ngân hàng.
- Dữ liệu lấy RAM làm trọng tâm hoạt động vì vậy khi hoạt động yêu cầu một bộ nhớ RAM lớn.
- Mọi thay đổi về dữ liệu mặc định đều chưa được ghi xuống ổ cứng ngay lập tức vì vậy khả năng bị mất dữ liệu từ nguyên nhân mất điện đột xuất là rất cao.

## 💛 Khi nào sử dụng MongoDB?

- Quản lý và truyền tải content – Quản lý đa dạng nhiều product của content chỉ trong một kho lưu trữ data cho phép thay đổi và phản hồi nhanh chóng mà không chịu thêm phức tạp thêm từ hệ thống content.
- Cấu trúc Mobile và Social – MongoDB cung cấp một platform có sẵn, phản xạ nhanh, và dễ mở rộng cho phép rất nhiều khả năng đột phá, phân tích real-time, và hỗ trợ toàn cầu.
- Quản lý data khách hàng – Tận dụng khả năng query nhanh chóng cho phân tích real-time trên cơ sở dữ liệu người dùng cực lớn vớ các mô hình data phức tạp bằng các schema linh hoạt và tự động sharding cho mở rộng chiều ngang.

## 💛 Cài đặt MongoDB

To be able to experiment with the code examples, you will need access to a MongoDB database.

You can download a free MongoDB database at https://www.mongodb.com.

> <https://www.mongodb.com/try/download/community>

Install (MacOS):

> <https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/>

Install (Windows):

> <https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/>

Compass Tool:

> <https://www.mongodb.com/products/compass>

Extension for VS Code:

> <https://www.mongodb.com/products/vs-code>

PaaS: Get started right away with a MongoDB cloud service at https://www.mongodb.com/cloud/atlas.

---

## 💛 Install MongoDB driver and Mongoose

```bash
npm install mongoose --save
```

## 💛 Mongoose SchemaTypes

Tham khảo: <https://mongoosejs.com/docs/schematypes.html>

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array
- Decimal128
- Map
- Schema

## 💛 Mongoose Built-in Validators

<https://mongoosejs.com/docs/validation.html#built-in-validators>

## 💛 Mongoose Model

### Data Model Design

Đối chiếu với SQL thì trong MongoDB (No SQL) thì một Database được gọi là **Document**, các Table thì gọi là Collection.

Cấu trúc của một Document sẽ được quyết định bởi 2 kiểu:

- embed
- use references

Data Model Design: <https://www.mongodb.com/docs/manual/core/data-model-design/#data-model-design>
Data Model: <https://www.mongodb.com/docs/manual/applications/data-models/>
