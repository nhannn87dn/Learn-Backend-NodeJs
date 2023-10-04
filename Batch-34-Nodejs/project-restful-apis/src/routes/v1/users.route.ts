import express, {Request, Response} from 'express';
import users from '../../constants/users.json';
import {sendJsonSuccess} from '../../helpers/responseHandler'

const router = express.Router();


//Get All users from DB
router.get('/users', (req: Request, res: Response)=>{
    
    console.log('user.routes.ts', '2');
    //res.status(200).json(users); 
    //sendJsonSuccess(res)(); // Gọi hàm mà không truyền giá trị cho data và globalData
    sendJsonSuccess(res)(users); // Gọi hàm mà có truyền giá trị cho data 
});
//get user by ID
router.get('/users/:id([0-9]+)', (req: Request, res: Response)=>{
    const {id} = req.params; //==> string
    const user = users.find(user => user.id === parseInt(id))
  
    sendJsonSuccess(res)(user);
});


//Xuất router ra
export default router