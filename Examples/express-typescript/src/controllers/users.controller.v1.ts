import express, { Express, NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import User from  '../models/User.model'

/**
 * Get All Users
 */
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
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
     
}
  


export default {
    getAllUsers
};
