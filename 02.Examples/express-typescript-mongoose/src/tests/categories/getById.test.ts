import request from 'supertest';
import app from '../../app';
import * as http from 'http';
import {connectDB, disconnectDB} from  '../../helpers/mongooseHeplper';
import appConfigs from '../../constants/configs'
/**
 * Các bước để unit Test 1 Request
 * 1. Kết nối với App Database
 * 2. Kết nối với Express
 * 3. Test Suite từng case: https://jestjs.io/docs/expect
 * 
 */


/* Sử dụng agent để bắt request dùng port của server */
const agent = request.agent(app);
let server: http.Server;

//========1. Kết nối với Database ==========//
//sử dụng startServer và stopServer để khởi động và dừng server trước và sau khi tất cả các tests chạy
beforeAll(async () => {
  await connectDB()
  .then(() => {
    
    //========2. Kết nối với Express ==========//
    // Đảm bảo rằng kết nối MongoDB đã thành công trước khi lắng nghe ứng dụng
     server =  app.listen(appConfigs.PORT, () => {
      console.log(`Server started on port ${appConfigs.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
});

/** Sau khi test xong thì tắt */
afterAll(async () => {
  await disconnectDB();
  server.close();
});

//========3. Test Suite từng case ==========//



describe('GET /api/v1/categories/:id', () => {
    
   // Không đúng định dạng ObjectID
    test('should be return 500 if invalid ObjectId', async () => {


        const response = await agent.get('/api/v1/categories/234232');
        //const response = await request(app).get('/api/v1/categories/234232');
    
        //So sánh status với kết quả đúng
        expect(response.status).toBe(500);
        //So sánh với kết quả đúng
        expect(response.body.statusCode).toBe(500);
        expect(response.body.errorType).toBe('CastError');
        //Chỉ kiểm tra có thuộc tính message, ko cần kiểm tra giá trị
        expect(response.body).toHaveProperty('message');
        /**
         * Danh sách các expect: https://jestjs.io/docs/expect
         */
      
    });

    //ID đúng định dạng, nhưng không tồn tại
    test('should be return 404 with message: Category not found', async () => {

        const response = await agent.get('/api/v1/categories/64e985dec6628ed4d2d766d4');
    
        //So sánh status với kết quả đúng
        expect(response.status).toBe(404);
        //So sánh với kết quả đúng
        expect(response.body.statusCode).toBe(404);
        expect(response.body.message).toBe('Category not found');
        //Chỉ kiểm tra có thuộc tính, ko cần kiểm tra giá trị
        expect(response.body).toHaveProperty('errorType');
       
      
    });

    //Đúng ID
    test('should be return 200 with Json Data', async () => {

        const response = await agent.get('/api/v1/categories/64e985dec6628ed4d2d76673');
    
        //So sánh status với kết quả đúng
        expect(response.status).toBe(200);
        //So sánh với kết quả đúng
        expect(response.body.statusCode).toBe(200);
        expect(response.body.message).toBe('Success');
        //Chỉ kiểm tra có thuộc tính, ko cần kiểm tra giá trị
        expect(response.body.data).toHaveProperty('name');
        expect(response.body.data).toHaveProperty('description');
       
      
    });
  
    
  });