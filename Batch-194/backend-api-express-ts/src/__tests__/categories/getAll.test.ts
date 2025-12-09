import request from 'supertest';
/**
 * Lấy cấu hình của APP qua test
 * Để chạy được API cần khởi động
 * express và moongoose như dưới đây
 * 
 */

import app from '../../app';
import { ENV } from '../../config/ENV';
import { connectDB, disconnectDB } from '../../helpers/mongooseDB';

/* Sử dụng agent để bắt request dùng port của server */
const agent = request.agent(app);
let server: any;

//sử dụng startServer và stopServer để khởi động và dừng server trước và sau khi tất cả các tests chạy
beforeAll(async () => {
  await connectDB()
  .then(() => {
    // Đảm bảo rằng kết nối MongoDB đã thành công trước khi lắng nghe ứng dụng
     server =  app.listen(ENV.PORT, () => {
      console.log(`Server started on port ${ENV.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
});

/** Sau khi test xong thì tắt */
afterAll(async () => {
  await disconnectDB();
  await server.close();
});


describe('GET /api/v1/categories', () => {
  
  test('should return Object contain Categories List width status Code 200', async () => {
      const res = await agent.get('/api/v1/categories');
  
      //So sánh status với kết quả đúng
      expect(res.status).toBe(200);

      expect(res.body.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Success');

      expect(res.body).toHaveProperty('data');

      // Ví dụ kiểm tra một số đặc điểm của dữ liệu trả về
      // (tùy thuộc vào dữ liệu thực tế của bạn)
      expect(Array.isArray(res.body.data)).toBe(true);
      //Kiểm tra chi tiết thêm về mảng trả về
      res.body.data.forEach((category: any) => {
        expect(category).toHaveProperty('_id');
        expect(category).toHaveProperty('category_name');
        expect(category).toHaveProperty('slug');
        // thêm bất kỳ đoạn kiểm tra nào khác bạn muốn thực hiện với dữ liệu category
      });
  });

});