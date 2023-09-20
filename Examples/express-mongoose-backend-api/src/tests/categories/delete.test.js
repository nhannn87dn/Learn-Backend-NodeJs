const request = require('supertest');
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


describe('DELETE /api/v1/categorie', () => {
    //Xóa không truyền ID vào body
    test('should return a object width status 400 if ID is empty', async () => {
      
        const payload = {};
    
        const response = await agent.delete('/api/v1/categories').send(payload);
    
        //So sánh status với kết quả đúng
        expect(response.status).toBe(400);
        //So sánh với kết quả đúng
        expect(response.body).toEqual(
            {
                statusCode: 400,
                errorType: "validateSchema",
                message: "\"id\" is required"
            }
        );
    });
    //Xóa truyền ID vào body, nhưng ID không phải ObjectID
    test('should return a object width status 400 if ID is non-ObjectID', async () => {
      
        const payload = {
            id: '123'
        };
    
        const response = await agent.delete('/api/v1/categories').send(payload);
    
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
    //Xóa truyền ID, nhưng ID không tồn tại
    test('should return a object width status 404 if ID is not exist', async () => {
      
        const payload = {
            id: '6482d04ecfe5b4e115b18d54'
        };
    
        const response = await agent.delete('/api/v1/categories').send(payload);
    
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

    //Đúng all
    test('should return a object width status 200 if delete successfully', async () => {
  
        /**
         * Nên test theo kiểu tạo mới 1 cái, rồi sau đó xóa nó
         */
        const payload = {
          id:  '6483f16eeaf6d70a48260837'
        };
    
        const response = await agent.delete('/api/v1/categories').send(payload);
    
        //So sánh status với kết quả đúng
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Success');
       
        expect(response.body.data._id).toHaveProperty('6483f16eeaf6d70a48260837');
        expect(response.body.data).toHaveProperty('name');
        expect(response.body.data).toHaveProperty('slug');
        expect(response.body.data).toHaveProperty('image');
    });
});