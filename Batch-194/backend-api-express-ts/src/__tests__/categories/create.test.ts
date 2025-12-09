import request from 'supertest';
import { faker } from '@faker-js/faker';

/**
 * Lấy cấu hình của APP qua test
 * Để chạy được API cần khởi động
 * express và moongoose như dưới đây
 * 
 */

import app from '../../app';
import { ENV } from '../../config/ENV';
import { connectDB, disconnectDB } from '../../helpers/mongooseDB';
import { buildSlug } from '../../utils/buildSlug';

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



describe('POST /api/v1/categories', () => {
  
    test('should return a object width status 201 if create successfully', async () => {
  
      // Tạo sản phẩm mới và lấy id của sản phẩm đó
      const categoryName = faker.commerce.department()+faker.string.numeric(5);
      const cateSlug = buildSlug(categoryName);
      const payload = {
        category_name:  categoryName,
        slug: cateSlug,
        description: `Description for category`,
      };
  
      const response = await agent.post('/api/v1/categories').send(payload);
  
      //So sánh status với kết quả đúng
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Resource created successfully');
      expect(response.body.data.category_name).toBe(categoryName);
      expect(response.body.data.slug).toBe(cateSlug);
  
      expect(response.body.data.description).toEqual('Description for category');
      
      expect(response.body.data).toHaveProperty('_id');
    });
  
  });