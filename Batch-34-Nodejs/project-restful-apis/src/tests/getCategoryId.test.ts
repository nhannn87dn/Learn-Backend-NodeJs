import request from 'supertest'
import app from '../app'
import {connectDB, disconnectDB} from '../helpers/mongooseHeplper'
import * as http from 'http';

/* Sử dụng agent để bắt request dùng port của server */
const agent = request.agent(app);
let server: http.Server;



beforeAll(async () => {
  await connectDB()
  .then(() => {
    
    //========2. Kết nối với Express ==========//
    // Đảm bảo rằng kết nối MongoDB đã thành công trước khi lắng nghe ứng dụng
     server =  app.listen(8080, () => {
      console.log(`Server started on port 8080`);
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


//Test từng case

describe('GET /api/v1/categories/:id', () => {

  //TH1: Sai định dạng ID, ko phải ObjectID
  test('should be return 500 if invalid ObjectId', async () => {

      const response = await agent.get('/api/v1/categories/234232');
    
      //So sánh status với kết quả đúng
      expect(response.status).toBe(500);
      //So sánh với kết quả đúng
      expect(response.body.statusCode).toBe(500);
      expect(response.body.errorType).toBe('CastError');
      //Chỉ kiểm tra có thuộc tính message, ko cần kiểm tra giá trị
      expect(response.body).toHaveProperty('message');

  })

  //TH2. Đúng định dạng ObjectID, nhưng nó tồn tại trong CSDL


  //TH3: Đúng định ObjectID, và có tồn tại ObjectID trong CDSL
  test('should be return status 200 width data json', async () => {

    //Nó đóng vai trò như postman
    const response = await agent.get('/api/v1/categories/652fbcd9ae1b9ad5c007134f');
  
    //So sánh status với kết quả đúng
    expect(response.status).toBe(200);
    //So sánh với kết quả đúng
    expect(response.body.statusCode).toBe(200);
    expect(response.body.message).toBe('Success');
    //Chỉ kiểm tra có thuộc tính message, ko cần kiểm tra giá trị
    expect(response.body).toHaveProperty('data');

})

})

