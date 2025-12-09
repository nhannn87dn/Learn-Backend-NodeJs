import request from 'supertest';
import { faker } from '@faker-js/faker';
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


describe('GET /api/v1/categories/:id', () => {
  
  test('should return 400 if invalid id', async () => {
      const response = await agent.get('/api/v1/categories/Health1');
  
      //So sánh status với kết quả đúng
      expect(response.status).toBe(400);
      //So sánh với kết quả đúng
      expect(response.body).toEqual(
          {
            statusCode: 400,
            errorType: "validateSchema",
            message: "Slug contain only letters, numbers, and hyphens"
          }
      );
  });

  

  test('should return 200 if found', async () => {

    // Tạo sản phẩm mới và lấy id của sản phẩm đó
    const categoryName = faker.commerce.department()+faker.string.numeric(5);
    const cateSlug = buildSlug(categoryName);
    const payload = {
      category_name:  categoryName,
      slug: cateSlug,
      description: `Description for category`,
    };

    const res = await agent.post('/api/v1/categories').send(payload);

    //const slug = res.body.data.slug;
    const id = res.body.data._id;

    const response = await agent.get(`/api/v1/categories/${id}`);

    //So sánh status với kết quả đúng
    expect(response.status).toBe(200);

    expect(response.body.message).toBe('Success');
    expect(response.body.data._id).toBe(id);
    expect(response.body.data.category_name).toBe(categoryName);
    expect(response.body.data.slug).toBe(cateSlug);
    expect(response.body.data.description).toEqual('Description for category');
  });

});