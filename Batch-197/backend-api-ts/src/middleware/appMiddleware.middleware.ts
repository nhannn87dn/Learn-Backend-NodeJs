import { type Request, type Response, type NextFunction } from 'express';

/*
Khi nào thì dùng middleware cấp độ ứng dụng (Application-level middleware) trong Express.js?
Trả lời:
- Middleware cấp độ ứng dụng (Application-level middleware) trong Express.js được sử dụng khi bạn muốn áp dụng một chức năng hoặc xử lý logic cho tất cả các route trong ứng dụng của bạn. Điều này có nghĩa là middleware sẽ được gọi trước khi bất kỳ route nào được xử lý, giúp bạn thực hiện các tác vụ như:
1. Logging: Ghi lại thông tin về các yêu cầu đến ứng dụng, chẳng hạn như URL, phương thức HTTP, thời gian, v.v.
2. Authentication: Kiểm tra xem người dùng đã đăng nhập hay chưa trước khi cho phép truy cập vào các route.
3. Error Handling: Xử lý lỗi chung cho toàn bộ ứng dụng.
4. Request Parsing: Phân tích dữ liệu từ yêu cầu (request) như JSON hoặc URL-encoded data.
5. CORS Handling: Quản lý các chính sách Cross-Origin Resource Sharing (CORS) cho toàn bộ ứng dụng.

Tổng quát: Khi bạn muốn xử lí một logic gì đó khi bất kỳ một request nào được
 gửi đến ứng dụng của bạn, bạn nên sử dụng middleware cấp độ ứng dụng.
*/

export const appMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Middleware logic here
  console.log(`1. appMiddleware`);

  //Bắt buộc đặt ở cuối cùng của middleware để tiếp tục xử lý các middleware tiếp theo
  next();
}