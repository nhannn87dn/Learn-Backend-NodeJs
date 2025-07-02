# Express.js 5.1.0 Log
Express.js 5.1.0 là phiên bản mới nhất của framework Express, được công bố là phiên bản mặc định trên npm từ ngày 31/03/2025. Dưới đây là tóm tắt các tính năng mới và thay đổi quan trọng trong Express@5.1.0, dựa trên thông tin từ các nguồn chính thức:

### **Tính năng mới và cải tiến chính**
1. **Trở thành phiên bản mặc định trên npm**:
   - Express 5.1.0 đã chính thức được gắn tag `latest` trên npm, thay thế cho các phiên bản 4.x. Điều này đánh dấu bước chuyển đổi hoàn chỉnh sang phiên bản 5.x sau thời gian dài phát triển và thử nghiệm.[](https://expressjs.com/2025/03/31/v5-1-latest-release.html)

2. **Lịch trình hỗ trợ dài hạn (LTS)**:
   - Express 5.1.0 giới thiệu lịch trình LTS chính thức cho cả dòng 4.x và 5.x, đảm bảo hỗ trợ dài hạn với các giai đoạn:
     - **CURRENT**: Phiên bản mới được phát hành, tồn tại ít nhất 3 tháng.
     - **ACTIVE**: Phiên bản ổn định, được gắn tag `latest` trên npm trong tối thiểu 12 tháng.
     - **MAINTENANCE**: Phiên bản trước đó được hỗ trợ trong 12 tháng sau khi phiên bản mới trở thành ACTIVE.
   - Điều này giúp các nhà phát triển dễ dàng lập kế hoạch nâng cấp và duy trì ứng dụng.[](https://expressjs.com/2025/03/31/v5-1-latest-release.html)

3. **Nhóm làm việc hiệu suất (Performance Working Group)**:
   - Express 5.1.0 đánh dấu sự ra mắt của Performance Working Group, được hỗ trợ bởi Sovereign Tech Fund (STF), tập trung vào việc xác định và sửa các điểm nghẽn lâu dài về hiệu suất, cải thiện trải nghiệm người dùng và tính bền vững của framework.[](https://expressjs.com/2025/03/31/v5-1-latest-release.html)

4. **Cải thiện tài liệu và hướng dẫn chuyển đổi**:
   - Tài liệu cho Express 5.x đã được cập nhật đáng kể, bao gồm hướng dẫn di chuyển (migration guide) chi tiết và các codemod để tự động hóa việc cập nhật mã từ phiên bản 4.x sang 5.x. Các đóng góp từ cộng đồng đã giúp hoàn thiện tài liệu và sửa lỗi còn sót lại từ các phiên bản trước.[](https://expressjs.com/2025/03/31/v5-1-latest-release.html)

5. **Cải tiến TypeScript và website**:
   - Express 5.1.0 tiếp tục cải thiện hỗ trợ TypeScript, nâng cao trải nghiệm phát triển (Developer Experience - DX) với các định nghĩa kiểu (type definitions) tốt hơn.
   - Website của Express cũng đang được cải tiến để cung cấp thông tin cập nhật và chính xác hơn.[](https://expressjs.com/2025/03/31/v5-1-latest-release.html)

### **Các thay đổi kế thừa từ Express 5.0.0**
Express 5.1.0 xây dựng trên nền tảng của Express 5.0.0 (phát hành ngày 09/09/2024), nên nó kế thừa các tính năng và cải tiến từ phiên bản này, bao gồm:

1. **Hỗ trợ Node.js 18 trở lên**:
   - Express 5.x yêu cầu Node.js 18 hoặc cao hơn, loại bỏ hỗ trợ cho các phiên bản cũ hơn để tận dụng các tính năng hiện đại của JavaScript và cải thiện hiệu suất.[](https://expressjs.com/2024/10/15/v5-release.html)

2. **Xử lý lỗi async/await được cải thiện**:
   - Hỗ trợ tự động chuyển các promise bị từ chối (rejected promises) trong middleware và route handler đến middleware xử lý lỗi, loại bỏ nhu cầu sử dụng try-catch thủ công. Ví dụ:
     ```javascript
     // Express 5
     app.get('/users/:id', async (req, res) => {
       const user = await findUser(req.params.id);
       res.json(user);
     });
     // Xử lý lỗi tự động
     app.use((err, req, res, next) => {
       res.status(500).send(err.message);
     });
     ```
     Điều này giúp mã nguồn gọn gàng và dễ bảo trì hơn.[](https://commandcodes.medium.com/whats-new-in-express-js-5-0-a-comprehensive-guide-cb1317e819b7)

3. **Hỗ trợ nén Brotli**:
   - Express 5.x hỗ trợ mã hóa Brotli (`br`) để giảm kích thước phản hồi, cải thiện hiệu suất cho các trình duyệt hiện đại. Cách sử dụng:
     ```javascript
     const compression = require('compression');
     app.use(compression({ br: true }));
     ```
    [](https://shubhadipbhowmik.vercel.app/blog/express-5-migration-guide/)

4. **Cải tiến xử lý route (path-to-regexp@8.x)**:
   - Cập nhật thư viện `path-to-regexp` từ 0.x lên 8.x, cải thiện bảo mật và đơn giản hóa định nghĩa route.
   - Loại bỏ các biểu thức chính quy "sub-expression" (như `/:foo(\\d+)`), yêu cầu sử dụng thư viện xác thực đầu vào (input validation) để ngăn chặn tấn công ReDoS.
   - Cú pháp wildcard được thay đổi:
     - Express 4: `/foo*` → Express 5: `/foo(.*)`
     - Tham số tùy chọn: `/user/:id?` → `/user{/:id}`
     - Tham số không tên không còn được truy cập bằng chỉ số (`req.params[0]`), mà phải đặt tên rõ ràng.[](https://expressjs.com/2024/10/15/v5-release.html)[](https://www.infoq.com/news/2025/01/express-5-released/)

5. **Loại bỏ các API và phương thức không còn được hỗ trợ**:
   - `app.del()` → Sử dụng `app.delete()`.
   - `app.param(fn)` → Sử dụng `app.param(name, fn)` hoặc truy cập trực tiếp `req.params`, `req.body`, `req.query`.
   - Các phương thức số nhiều được chuẩn hóa: `req.acceptsCharset()` → `req.acceptsCharsets()`.
   - `res.sendfile()` → Sử dụng `res.sendFile()`.
   - `res.redirect('back')` → Sử dụng `req.get('Referrer') || '/'`.
   - Các phương thức như `res.json(status, obj)` được thay bằng `res.status(status).json(obj)`.[](https://www.trevorlasn.com/blog/whats-new-in-express-5)[](https://www.hoseinh.com/reviewing-the-most-important-changes-in-express-5/)

6. **Cải tiến body parser**:
   - Tùy chỉnh độ sâu body URL-encoded (mặc định: 32).
   - Loại bỏ middleware `bodyParser()` kết hợp, yêu cầu sử dụng `express.json()` và `express.urlencoded()` riêng lẻ.
   - `req.body` trả về `undefined` nếu body chưa được phân tích cú pháp (trước đây trả về `{}`).[](https://medium.com/%40sm_hemel/whats-new-in-express-js-v5-0-af3aa1d6f8aa)

7. **Cải tiến hiệu suất và bảo mật**:
   - Sử dụng các phương thức gốc của Node.js (như `Array.flat()`) thay vì các thư viện phụ thuộc cũ (như `array-flatten`).
   - Cải thiện xử lý lỗi với stack trace chi tiết hơn và thông báo lỗi rõ ràng hơn.
   - Sửa các lỗ hổng bảo mật, bao gồm CVE-2024-45590, liên quan đến ReDoS và các vấn đề khác.[](https://github.com/expressjs/express/releases)[](https://commandcodes.medium.com/whats-new-in-express-js-5-0-a-comprehensive-guide-cb1317e819b7)

8. **Khôi phục `app.router`**:
   - Đối tượng `app.router` được đưa trở lại, hoạt động như một tham chiếu đến router cơ bản của Express, không cần khởi tạo rõ ràng như trong Express 3.[](https://medium.com/%40sm_hemel/whats-new-in-express-js-v5-0-af3aa1d6f8aa)

### **Hướng dẫn nâng cấp**
1. **Yêu cầu**:
   - Đảm bảo bạn đang sử dụng Node.js 18 trở lên.
   - Sao lưu dự án trước khi nâng cấp.

2. **Cài đặt Express 5.1.0**:
   ```bash
   npm install express@5.1.0 --save
   ```

3. **Chạy kiểm thử**:
   - Chạy bộ kiểm thử tự động để xác định các lỗi tương thích.
   - Sửa các phương thức không còn được hỗ trợ theo hướng dẫn trong tài liệu di chuyển chính thức.[](https://expressjs.com/2025/03/31/v5-1-latest-release.html)[](https://expressjs.com/en/guide/migrating-5.html)

4. **Sử dụng codemod**:
   - Express cung cấp các công cụ codemod để tự động hóa việc cập nhật mã. Chạy lệnh sau để áp dụng:
     ```bash
     npx express-codemod
     ```
     Xem chi tiết tại kho lưu trữ codemod và hướng dẫn di chuyển.[](https://expressjs.com/2025/03/31/v5-1-latest-release.html)[](https://expressjs.com/en/guide/migrating-5.html)

5. **Kiểm tra cú pháp route**:
   - Cập nhật các mẫu route sử dụng cú pháp cũ (như wildcard hoặc tham số tùy chọn) theo chuẩn mới.
   - Sử dụng thư viện xác thực đầu vào (như `joi`) để thay thế các biểu thức chính quy phức tạp.[](https://dev.to/leapcell/express-500-new-features-and-updates-48an)

6. **Kiểm tra xử lý lỗi async**:
   - Đảm bảo middleware và route handler tận dụng tính năng xử lý lỗi promise tự động.

### **Lưu ý khi nâng cấp**
- **Phá vỡ tương thích (Breaking Changes)**: Vì Express 5.x loại bỏ nhiều API cũ và thay đổi cú pháp route, các ứng dụng Express 4.x có thể gặp lỗi khi nâng cấp trực tiếp. Hãy kiểm tra kỹ tài liệu di chuyển.[](https://expressjs.com/en/guide/migrating-5.html)[](https://medium.com/%40ratneshkumarprajapati367/upgrading-to-express-js-v5-what-you-need-to-know-550a5535df57)
- **Hỗ trợ phiên bản cũ**: Express 4.x sẽ chuyển sang giai đoạn MAINTENANCE trong 12 tháng kể từ khi 5.1.0 trở thành `latest`. Các bản vá bảo mật quan trọng vẫn được cung cấp thông qua quan hệ đối tác với HeroDevs.[](https://expressjs.com/2024/10/15/v5-release.html)

### **Tài liệu tham khảo**
- Để biết thêm chi tiết, hãy xem:
  - [Hướng dẫn di chuyển chính thức](https://expressjs.com/en/guide/migrating-5.html)[](https://expressjs.com/en/guide/migrating-5.html)
  - [Thông báo phát hành Express 5.1.0](https://expressjs.com)[](https://expressjs.com/2025/03/31/v5-1-latest-release.html)
  - [Release Notes trên GitHub](https://github.com/expressjs/express/releases)[](https://github.com/expressjs/express/releases)


So sánh cú pháp của **Express@5.1.0** với các phiên bản cũ hơn (chủ yếu là **Express 4.x**), có một số thay đổi đáng kể, nhưng không phải tất cả đều làm thay đổi lớn cách bạn viết code. Dưới đây là phân tích ngắn gọn về sự khác biệt cơ bản giữa Express 5.1.0 và Express 4.x, tập trung vào cú pháp và các điểm cần lưu ý:

### **1. Tổng quan về mức độ khác biệt**
- **Không quá khác biệt lớn về cách sử dụng cơ bản**: Nếu bạn đã quen với Express 4.x, các tác vụ cơ bản như thiết lập server, định nghĩa route, sử dụng middleware, hoặc phục vụ static files vẫn tương tự. Hầu hết các ứng dụng đơn giản chỉ cần thay đổi nhỏ để tương thích với Express 5.x.
- **Phá vỡ tương thích (Breaking Changes)**: Express 5.x giới thiệu một số thay đổi phá vỡ (breaking changes) trong cú pháp và API, đặc biệt liên quan đến xử lý route, body parsing, và một số phương thức đã bị loại bỏ. Những thay đổi này có thể yêu cầu chỉnh sửa mã, nhưng có công cụ hỗ trợ (như codemod) để tự động hóa.
- **Cải tiến hiện đại**: Express 5.x tận dụng các tính năng mới của Node.js (từ 18 trở lên) và cải thiện hỗ trợ async/await, TypeScript, và hiệu suất.

### **2. Các khác biệt cơ bản về cú pháp**
Dưới đây là những thay đổi chính so với Express 4.x:

#### **a. Phục vụ Static Files**
- **Express 4.x**:
  ```javascript
  app.use(express.static('public'));
  ```
- **Express 5.1.0**:
  ```javascript
  app.use(express.static(path.join(__dirname, '../public')));
  ```
- **Khác biệt**: Không có thay đổi về cú pháp cho `express.static`. Cách sử dụng để phục vụ file tĩnh (như HTML, CSS, hình ảnh) vẫn giống nhau. Tuy nhiên, Express 5.x khuyến khích sử dụng `path.join` để đảm bảo tính tương thích trên các hệ điều hành khác nhau.

#### **b. Xử lý Route (path-to-regexp 8.x)**
- **Express 4.x**:
  - Sử dụng `path-to-regexp` phiên bản cũ, hỗ trợ cú pháp như:
    ```javascript
    app.get('/user/:id?', (req, res) => { ... }); // Tham số tùy chọn
    app.get('/file/*', (req, res) => { ... }); // Wildcard
    app.get('/:id(\\d+)', (req, res) => { ... }); // Biểu thức chính quy
    ```
  - Tham số không tên được truy cập qua `req.params[0]`.

- **Express 5.1.0**:
  - Cập nhật lên `path-to-regexp` 8.x, thay đổi cú pháp:
    ```javascript
    app.get('/user{/:id}', (req, res) => { ... }); // Tham số tùy chọn
    app.get('/file/(.*)', (req, res) => { ... }); // Wildcard
    ```
  - Biểu thức chính quy trực tiếp (như `/:id(\\d+)`) không còn được khuyến khích. Thay vào đó, sử dụng kiểm tra đầu vào:
    ```javascript
    app.get('/users/:id', (req, res) => {
      if (!req.params.id.match(/^\d+$/)) throw new Error('Invalid ID');
      res.json({ id: req.params.id });
    });
    ```
  - Tham số không tên không còn truy cập được qua `req.params[0]`. Bạn phải đặt tên rõ ràng cho tham số.

- **Khác biệt**: Cú pháp route phức tạp hơn một chút với tham số tùy chọn và wildcard. Cần cập nhật các route cũ để tuân theo chuẩn mới, đặc biệt nếu bạn sử dụng biểu thức chính quy hoặc tham số không tên.

#### **c. Xử lý lỗi Async/Await**
- **Express 4.x**:
  - Cần xử lý lỗi thủ công trong các route async:
    ```javascript
    app.get('/api/users/:id', async (req, res, next) => {
      try {
        const user = await fetchUser(req.params.id);
        res.json(user);
      } catch (err) {
        next(err); // Chuyển lỗi tới middleware
      }
    });
    ```
- **Express 5.1.0**:
  - Hỗ trợ tự động chuyển lỗi từ các promise bị từ chối:
    ```javascript
    app.get('/api/users/:id', async (req, res) => {
      const user = await fetchUser(req.params.id);
      res.json(user);
    });
    app.use((err, req, res, next) => {
      res.status(500).json({ error: err.message });
    });
    ```
- **Khác biệt**: Cú pháp gọn hơn, không cần `try-catch` trong route async, giúp mã dễ đọc và bảo trì hơn.

#### **d. Body Parsing**
- **Express 4.x**:
  - Sử dụng middleware `body-parser` tích hợp:
    ```javascript
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    ```
  - `req.body` mặc định trả về `{}` nếu body chưa được phân tích.
- **Express 5.1.0**:
  - Vẫn sử dụng `express.json()` và `express.urlencoded()`, nhưng `body-parser` không còn là phụ thuộc riêng.
  - `req.body` trả về `undefined` nếu body chưa được phân tích.
  - Hỗ trợ tùy chỉnh độ sâu body URL-encoded:
    ```javascript
    app.use(express.urlencoded({ extended: true, depth: 10 }));
    ```
- **Khác biệt**: Cần chú ý đến giá trị `undefined` của `req.body`. Cú pháp cơ bản không thay đổi nhiều, nhưng có thêm tùy chọn cấu hình như `depth`.

#### **e. Các phương thức bị loại bỏ hoặc thay đổi**
- **Express 4.x**:
  - Hỗ trợ các phương thức như:
    ```javascript
    app.del('/route', ...); // Xóa route
    res.sendfile('file.txt'); // Gửi file
    res.json(404, { error: 'Not found' }); // Gửi JSON với status
    res.redirect('back'); // Chuyển hướng về Referrer
    ```
- **Express 5.1.0**:
  - Thay đổi:
    ```javascript
    app.delete('/route', ...); // Thay cho app.del
    res.sendFile(path.join(__dirname, 'file.txt')); // Thay cho res.sendfile
    res.status(404).json({ error: 'Not found' }); // Chuẩn hóa cú pháp
    res.redirect(req.get('Referrer') || '/'); // Thay cho 'back'
    ```
- **Khác biệt**: Một số phương thức cũ bị loại bỏ hoặc chuẩn hóa để rõ ràng hơn. Cần cập nhật mã nếu bạn sử dụng các API này.

#### **f. Hỗ trợ nén Brotli**
- **Express 4.x**: Chỉ hỗ trợ nén gzip hoặc deflate qua `compression`.
- **Express 5.1.0**:
  ```javascript
  const compression = require('compression');
  app.use(compression({ br: true }));
  ```
- **Khác biệt**: Thêm hỗ trợ Brotli, nhưng cần cài đặt thêm `compression` và không ảnh hưởng đến cú pháp cơ bản.

#### **g. Yêu cầu Node.js**
- **Express 4.x**: Hỗ trợ Node.js từ phiên bản cũ (như 0.10).
- **Express 5.1.0**: Yêu cầu Node.js 18 trở lên, tận dụng các tính năng hiện đại như `Array.flat()`.

### **3. Đánh giá mức độ khác biệt**
- **Đối với ứng dụng cơ bản**: Nếu ứng dụng của bạn chủ yếu sử dụng các tính năng cơ bản (static files, route đơn giản, middleware tiêu chuẩn), sự khác biệt là tối thiểu. Bạn chỉ cần cập nhật phiên bản và kiểm tra các route có sử dụng wildcard hoặc biểu thức chính quy.
- **Đối với ứng dụng phức tạp**: Nếu bạn sử dụng các API cũ (như `app.del`, `res.sendfile`), biểu thức chính quy trong route, hoặc phụ thuộc vào `req.params[0]`, bạn sẽ cần chỉnh sửa mã. Công cụ `express-codemod` có thể giúp tự động hóa quá trình này:
  ```bash
  npx express-codemod
  ```
- **Lợi ích của Express 5.x**:
  - Cú pháp async/await gọn gàng hơn.
  - Hiệu suất được cải thiện (nhờ nén Brotli và tối ưu hóa).
  - Hỗ trợ TypeScript tốt hơn.
  - Bảo mật cao hơn (sửa lỗi ReDoS, cập nhật phụ thuộc).

### **4. Ví dụ so sánh phục vụ Static Files**
Để minh họa, đây là cách phục vụ static files trong cả hai phiên bản (không có nhiều khác biệt):

- **Express 4.x**:
  ```javascript
  const express = require('express');
  const app = express();

  app.use(express.static('public'));

  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
  ```

- **Express 5.1.0**:
  ```javascript
  const express = require('express');
  const path = require('path');
  const app = express();

  app.use(express.static(path.join(__dirname, 'public')));

  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
  ```

- **Khác biệt**: Chỉ cần thêm `path.join` để đảm bảo đường dẫn chính xác. Cú pháp cơ bản không thay đổi.
