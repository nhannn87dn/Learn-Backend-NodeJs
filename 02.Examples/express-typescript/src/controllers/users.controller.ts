import express, { Express, NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import usersService from '../services/users.service';
/**
 * Get All Users
 */
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await usersService.getAllUsers();
      res.status(200).json({
        statusCode: "0",
        message: 'success',
        data: users
      });
    } catch (error) {
      next(error)
    }
     
}

/**
 * Get All Users
 */
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
     const {id} = req.params;
     console.log('getUserById',id)
      const user = await usersService.getUserById(id);
      res.status(200).json({
        statusCode: "0",
        message: 'success',
        data: user
      });
    } catch (error) {
      next(error)
    }
     
}
  


export default {
    getAllUsers,
    getUserById
};
