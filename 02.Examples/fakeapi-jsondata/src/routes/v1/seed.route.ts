import createError from 'http-errors';
import express from 'express';
import { sendJsonSuccess } from '../../helpers/response.helper';
import { seedDB } from '../../services/seed.service';
const router = express.Router();

router.post('', async (req, res, next)=>{
    try {
        const { password } = req.body;
        if(password && password === 'seed@123'){
            await seedDB();
            sendJsonSuccess(res, null, "Seed successfully");
        }else{
            throw createError(401, "Password is incorrect");
        }
    } catch (error) {
        next(error);
    }
});

export default router;