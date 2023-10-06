import createError from 'http-errors';
import express, {NextFunction, Request, Response} from 'express';
import users from '../../constants/users.json';
import {sendJsonSuccess} from '../../helpers/responseHandler'
import fs from "fs";


//khi fs chạy, là nó lấy thư mục root của dự án làm gốc
const fileName = "./src/constants/users.json";

const router = express.Router();

//Get All users from DB
router.get('/users', (req: Request, res: Response)=>{
    
    console.log('user.routes.ts', '2');
    //res.status(200).json(users); 
    //sendJsonSuccess(res)(); // Gọi hàm mà không truyền giá trị cho data và globalData
    sendJsonSuccess(res)(users); // Gọi hàm mà có truyền giá trị cho data 
});

//get user by ID
router.get('/users/:id([0-9]+)', (req: Request, res: Response, next: NextFunction)=>{
    try{
        const {id} = req.params; //==> string
        const user = users.find(user => user.id === parseInt(id))
      
        sendJsonSuccess(res)(user);
    }catch (error){
        next(error)
    }
   
});

//Create a new user
router.post('/users', (req: Request, res: Response)=>{
    //thêm phần tử mới vào users[]
    //const newUsers = [...users, {id: 4, name: 'Tom', email: 'tom@gmail.com'}];
    const newUsers = [...users, req.body];
    //ghi nội dung xuống một file
    fs.writeFileSync(fileName, JSON.stringify(newUsers), { flag: 'w' });
    //trả lại thông tin cho clien
    sendJsonSuccess(res)(newUsers); // Gọi hàm mà có truyền giá trị cho data 
});

/**
 * Update a user by ID
 * PATH /api/v1/users/:id
 */
router.patch('/users/:id([0-9]+)', (req: Request, res: Response)=>{
    const {id} = req.params;
    console.log(id,req.body);

    //Bước 1: Tìm xem  có tồn tại user có id không
    const user = users.find(user => user.id === parseInt(id));

    //Nếu không tồn tại thì báo lỗi
    if(!user){
        throw createError('404', 'User not found');
    }

    //Bước 2: Cập nhật lại thông tin của user có id
    const newUsers = users.map(user => {
        if(user.id === parseInt(id)){
            const updateUser = {...user, ...req.body};
            return updateUser
        }
        return user
    });

     //ghi nội dung xuống một file
     fs.writeFileSync(fileName, JSON.stringify(newUsers), { flag: 'w' });

    sendJsonSuccess(res)(newUsers); // Gọi hàm mà có truyền giá trị cho data 
    //res.json('ok');
});

/**
 * Delete a user by ID
 * DELETE /api/v1/users/:id
 */
router.delete('/users/:id([0-9]+)', (req: Request, res: Response, next: NextFunction)=>{
    try{
        const {id} = req.params; //id = 4

        //Bước 1: Tìm xem  có tồn tại user có id không
        const user = users.find(user => user.id === parseInt(id));

        //Nếu không tồn tại thì báo lỗi
        if(!user){
            throw createError(404, 'User not found');
        }

        //Bước 2: Nếu tìm thấy thì mới đi xóa
        const newUsers = users.filter(user => user.id !== parseInt(id));

         //ghi nội dung xuống một file
       fs.writeFileSync(fileName, JSON.stringify(newUsers), { flag: 'w' });

       sendJsonSuccess(res)(newUsers); // Gọi hàm mà có truyền giá trị cho data 
    }catch(err){
        next(err); //Chuyển tiếp lỗi ra cho handle error ở app.ts xử lý
    }
});

//Xuất router ra
export default router