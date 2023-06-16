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

/**
 * Tương ứng với từng role ở src\validations\category.validation.js
 * Phải viết một test case tương ứng
 */


describe('PUT /api/v1/categories/:id', () => {

    //điền payload, test id không đúng định dạng ObjectID
    test('should return a object width status 400 if ID is non-ObjectID', async () => {
        
        
        const categoryName = faker.commerce.department()+faker.string.numeric(5);
        const cateSlug = buildSlug(categoryName);
        const payload = {
          name:  categoryName,
          slug: cateSlug
        };
    
        const response = await agent.put('/api/v1/categories/123').send(payload);
    
        //So sánh status với kết quả đúng
        expect(response.status).toBe(400);
        //So sánh với kết quả đúng
        expect(response.body).toEqual(
            {
                statusCode: 400,
                errorType: "validateSchema",
                message: "ID is non-Objectid"
            }
        );
    });

    //điền payload, test id là ObjectID những không tồn tại
    test('should return a object width status 404 if ID not exist', async () => {

        const categoryName = faker.commerce.department()+faker.string.numeric(5);
        const cateSlug = buildSlug(categoryName);
        const payload = {
          name:  categoryName,
          slug: cateSlug
        };
    
        const response = await agent.put('/api/v1/categories/6482d04ecfe5b4e115b18d54').send(payload);
  
        //So sánh status với kết quả đúng
        expect(response.status).toBe(404);
        //So sánh với kết quả đúng
        expect(response.body).toEqual(
            {
              statusCode: 404,
              errorType: "HttpError",
              message: "Category not found"
            }
        );
    });

    //Không điền payload gì cả, đúng ID
    test('should return a object width status 400 if empty payload', async () => {
  
        const payload = {};

         /**
         * Nên test theo kiểu tạo mới 1 cái, rồi sau đó xóa nó
         */
        const response = await agent.put('/api/v1/categories/6482d04ecfe5b4e115b18d57').send(payload);
    
        //So sánh status với kết quả đúng
        expect(response.status).toBe(400);
        expect(response.body.statusCode).toBe(400);
        expect(response.body.errorType).toBe('validateSchema');
        expect(response.body).toHaveProperty('message');
        
        expect(response.body.message).toEqual("\"name\" is required, \"slug\" is required")
    });
    

    //Không điền name , đúng ID

    test('should return a object width status 400 if empty name', async () => {
  
        const payload = {
            slug: 'new-slug'
        };
    
        const response = await agent.put('/api/v1/categories/6482d04ecfe5b4e115b18d57').send(payload);
    
        //So sánh status với kết quả đúng
        expect(response.status).toBe(400);
        expect(response.body.statusCode).toBe(400);
        expect(response.body.errorType).toBe('validateSchema');
        expect(response.body).toHaveProperty('message');
        
        expect(response.body.message).toEqual("\"name\" is required")
    });

    //Không điền slug
    test('should return a object width status 400 if empty slug', async () => {
  
        const payload = {
            name: faker.commerce.department()+faker.string.numeric(5)
        };
    
        const response = await agent.put('/api/v1/categories/6482d04ecfe5b4e115b18d57').send(payload);
    
        //So sánh status với kết quả đúng
        expect(response.status).toBe(400);
        expect(response.body.statusCode).toBe(400);
        expect(response.body.errorType).toBe('validateSchema');
        expect(response.body).toHaveProperty('message');
        
        expect(response.body.message).toEqual("\"slug\" is required")
    });

    //Điền đủ và đúng thông tin
    test('should return a object width status 200 if updated successfully', async () => {
  
        /**
         * Nên test theo kiểu tạo mới 1 cái, rồi sau đó update nó
         */
        const categoryName = faker.commerce.department()+faker.string.numeric(5);
        const cateSlug = buildSlug(categoryName);
        const payload = {
          name:  categoryName,
          slug: cateSlug
        };
    
        const response = await agent.put('/api/v1/categories/6482d04ecfe5b4e115b18d57').send(payload);
    
        //So sánh status với kết quả đúng
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Success');
        expect(response.body.data.name).toBe(categoryName);
        expect(response.body.data.slug).toBe(cateSlug);
    
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data).toHaveProperty('image');
    });

    //test thêm vượt quá kí tự cho phép
    //Yêu cầu string, nhưng điền vào là số
  
});

