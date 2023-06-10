const request = require('supertest');
/* https://next.fakerjs.dev/ */
const { faker } = require('@faker-js/faker');
const buildSlug = require('../../helpers/buildSlug');
/**
 * Lấy cấu hình của APP qua test
 * Để chạy được API cần khởi động
 * express và moongoose như dưới đây
 * 
 */
const app = require('../../app');
const { connectDB, disconnectDB } = require('../../helpers/mongooseDB');
const configs = require('../../constants/configs');

/* Sử dụng agent để bắt request dùng port của server */
const agent = request.agent(app);
let server;

//sử dụng startServer và stopServer để khởi động và dừng server trước và sau khi tất cả các tests chạy
beforeAll(async () => {
  await connectDB()
  .then(() => {
    // Đảm bảo rằng kết nối MongoDB đã thành công trước khi lắng nghe ứng dụng
     server =  app.listen(configs.PORT, () => {
      console.log(`Server started on port ${configs.PORT}`);
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
  
    test('should return a object width status 200 if create successfully', async () => {
  
      // Tạo sản phẩm mới và lấy id của sản phẩm đó
      const categoryName = faker.commerce.department()+faker.string.numeric(5);
      const cateSlug = buildSlug(categoryName);
      const payload = {
        name:  categoryName,
        slug: cateSlug,
        content: `Description for category`,
        image: `https://picsum.photos/200/200`,
      };
  
      const response = await agent.post('/api/v1/categories').send(payload);
  
      //So sánh status với kết quả đúng
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Success');
      expect(response.body.data.name).toBe(categoryName);
      expect(response.body.data.slug).toBe(cateSlug);
  
      expect(response.body.data.content).toEqual('Description for category');
      
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('image');
    });
  
  });