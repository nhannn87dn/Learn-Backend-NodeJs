import express, {Request, Response} from 'express';
import users from '../../constants/users.json';

const router = express.Router();


//Get All users from DB
router.get('/users', (req: Request, res: Response)=>{
    console.log('2');
    res.status(200).json(users)
});

//Xuất router ra
export default router