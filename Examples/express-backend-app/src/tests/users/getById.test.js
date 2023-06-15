const request = require('supertest');
/* https://next.fakerjs.dev/ */
const { faker } = require('@faker-js/faker');
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


describe('GET /api/v1/users/:id', () => {
  
  test('should return 400 if ID non-Objectid', async () => {
      const response = await agent.get('/api/v1/users/123');
  
      //So sánh status với kết quả đúng
      expect(response.status).toBe(400);
      //So sánh với kết quả đúng
      expect(response.body).toEqual(
          {
              message: "123 non-Objectid",
              statusCode: 400,
              errorType: "validateSchema"
          }
      );
  });

  //test Validate request
  test('should return 404 if Objectid not exist', async () => {
      const response = await agent.get('/api/v1/users/647db7937640fa84b0580e24');
      //So sánh status với kết quả đúng
      // console.log('<<=== 🚀 response ===>>',response);
      expect(response.status).toBe(404);
      //So sánh với kết quả đúng
      expect(response.body).toEqual(
          {
            statusCode: 404,
            errorType: "HttpError",
            message: "User not found"
          }
      );
  });
  
    
  test('should return the correct users', async () => {
    // Tạo sản phẩm mới và lấy id của sản phẩm đó
    const userData = {
      name: faker.person.lastName(),
      email: faker.internet.email(),
      password: 'test123456',
      role: 'user'
    };

    const res = await agent.post('/api/v1/users').send(userData);
    // console.log('<<=== 🚀 res ===>>',res);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.name).toBe(userData.name);
    expect(res.body.data.email).toBe(userData.email);
    expect(res.body.data.role).toBe(userData.role);

  });

});