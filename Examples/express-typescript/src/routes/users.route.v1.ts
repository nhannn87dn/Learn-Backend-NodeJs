import express, { Express, NextFunction, Request, Response } from 'express';
import User from  '../models/User.model';
const router: Express = express();

/**
 * Get All Users
 * [GET] localhost:8080/api/v1/users 
 * 
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    res.status(200).json({
      statusCode: "0",
      message: 'success',
      data: users
    });
  } catch (error) {
    next(error)
  }
   
});
  


export default router;
