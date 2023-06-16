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



describe('POST /api/v1/brands', () => {

  //Không điền payload


  //Điền 1 trong các trường require
  
  //Điền đầy đủ và đúng
  test('should return a object width status 200 if create successfully', async () => {
  
      // Tạo thương hiệu mới và lấy id của thương hiệu đó
      const brandName = faker.company.name()+faker.string.numeric(5);
      const brandSlug = buildSlug(brandName);
      const payload = {
        name:  brandName,
        slug: brandSlug,
        content: `Description for brand`,
        image: `https://picsum.photos/200/200`,
      };
  
      const response = await agent.post('/api/v1/brands').send(payload);
  
      //So sánh status với kết quả đúng
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Success');
      expect(response.body.data.name).toBe(brandName);
      expect(response.body.data.slug).toBe(brandSlug);
  
      expect(response.body.data.content).toEqual('Description for brand');
      
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('image');
    });
  
  });