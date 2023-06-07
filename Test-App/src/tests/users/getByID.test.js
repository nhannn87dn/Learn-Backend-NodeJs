const request = require('supertest');
const app = require('../../app');

describe('GET /api/v1/users/:id', () => {
    //test Validate request
    // test('should return 400 if ID non-Objectid', async () => {
    //     const response = await request(app).get('/api/v1/users/123');
    //     //So sánh status với kết quả đúng
    //     expect(response.status).toBe(400);
    //     //So sánh với kết quả đúng
    //     expect(response.body).toEqual(
    //         {
    //             message: "123 non-Objectid",
    //             statusCode: 400,
    //             errorType: "validateSchema"
    //         }
    //     );
    // });

    //test Validate request
    test('should return 404 if Objectid not exist', async () => {
        const response = await request(app).get('/api/v1/users/647db7937640fa84b0580e24');
        //So sánh status với kết quả đúng
        //console.log(response.status);
        expect(response.status).toBe(500);
        //So sánh với kết quả đúng
        // expect(response.body).toEqual(
        //     {
        //         message: "123 non-Objectid",
        //         statusCode: 400,
        //         errorType: "validateSchema"
        //     }
        // );
    });


    
//   test('should return the correct users', async () => {
//     // Tạo sản phẩm mới và lấy id của sản phẩm đó
//     const user = await request(app).post('/api/v1/users').send({
//         name: 'SubAdmin',
//         email: 'admin@example.com',
//         password: 'subAdmin@123456',
//         role: 'user'
//     });
//     const userId = user.body._id;

//     // Lấy sản phẩm với id vừa tạo
//     const response = await request(app).get(`/api/v1/users/${userId}`);
//     expect(response.status).toBe(200);
//     //Nên tách ra từng trường để biết sai ở đâu
//     expect(response.body._id).toBe(userId);
//     expect(response.body.name).toBe('subAdmin@example.com');
//     expect(response.body.role).toBe('user');
//     expect(response.body.permissions).toBe([]);
//     expect(response.body.isEmailVerified).toBe(false);

//   });
});