# NextJs and Backend APIs

Trong bài học tiếp theo này chúng ta tìm hiểu:

- Các khái niệm Rendering trong NextJs
- Data Fetching - Cách lấy dữ liệu từ API

## 💛Rendering

Mặc định nextjs sẽ **pre-render** có nghĩa là Nextjs sẽ tạo ra file HTML tĩnh cho mỗi trang.

Điều này giúp tăng performance và SEO

Vậy Pe-render là gì ?
### 🔹 Pre-rendering

NextJs có 2 hình thức pre-rendering:

- Static Generation: HTML được generated ra tại lần bạn đánh lệnh build, và được tái sử dụng cho các request sau.
- Server-side Rendering: HTML được generated cho mỗi lần request.

Vậy khi nào thì dùng cái nào ?

- **Static Generation** được đề xuất dùng trong hầu hết các trường hợp nhằm tăng hiệu suất. Nếu bạn đang lo ngại vậy nếu như cần cập nhật dữ liệu mới thì sao. NextJs cho phép bạn cấu hình tự động generated lại sau 1 khoảng thời gian ấn định để làm tươi nội dung.

- **Server-side Rendering**: phù hợp cho các trường hợp cần thông tin động, cập nhật liên tục để đáp ứng nhu cầu người dùng.

---
### 🔹 **Server-side Rendering (SSR)**

Trong kiến trúc SSR, khi một yêu cầu từ trình duyệt được gửi đến máy chủ, Next.js sẽ chạy mã JavaScript phía máy chủ để tạo ra nội dung HTML của trang. Sau đó, trang HTML này sẽ được gửi đến trình duyệt của người dùng để hiển thị.

==> Xảy ra tại Server
### 🔹 **Client-side Rendering (CSR)**

Trong kiến trúc CSR, khi người dùng truy cập vào một trang, trình duyệt sẽ tải mã JavaScript của ứng dụng và chạy nó. Mã JavaScript này sẽ tạo ra nội dung HTML và gắn kết các sự kiện và tương tác người dùng. Các yêu cầu dữ liệu sau đó được gửi từ trình duyệt đến máy chủ thông qua API để lấy dữ liệu cần thiết, và sau đó nội dung trang được cập nhật dựa trên dữ liệu trả về.

==> Xảy ra tại trình duyệt

### 🔹 **Static Site Generation (SSG)**

Static Site Generation (SSG) là một phương pháp cho phép tạo ra các trang web tĩnh (static websites) bằng cách xây dựng và render toàn bộ nội dung trong quá trình build trước khi triển khai.

```bash
next build
```

Khi người dùng truy cập vào một trang web được tạo bằng phương pháp SSG, trình duyệt chỉ cần tải các tệp tĩnh đã được tạo trước và hiển thị chúng ngay lập tức mà không cần chờ đợi yêu cầu máy chủ. Do đó, thời gian tải trang ban đầu thường rất nhanh và trải nghiệm người dùng tốt.



### 🔹 **Incremental Static Regeneration (ISR)**

Incremental Static Regeneration (ISR) là một phương pháp mở rộng của Static Site Generation (SSG).

Cho phép bạn tạo và update các trang tĩnh trong lần build trước, sau một thời gian do bạn cấu hình mà không cần build app lại từ đâu.


Cụ thể như thế nào chúng ta tìm hiểu trong phần tiếp sau đây

---

## 💛 Data Fetching