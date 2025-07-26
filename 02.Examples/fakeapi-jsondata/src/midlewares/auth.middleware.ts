import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { decodedJWT, verifyToken } from "../utils/token.util";
import path from 'path';
import { readFile } from '../helpers/fileHandler';
import { IUser } from '../types/user';

const USER_PATH = path.join(__dirname, '../databases/user.json');

async function getAllUsers(): Promise<IUser[]> {
  try {
    const data = await readFile(USER_PATH);
    return Array.isArray(data) ? (data as IUser[]) : [];
  } catch {
    return [];
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Get the jwt token from the head
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  //If token is not valid, respond with 401 (unauthorized)
  if (!token) {
    return next(createError(401, "Unauthorized"));
  }

  try {
    const decoded = verifyToken(token) as decodedJWT;
    //Kiểm tra xem thông tin chứa trong token có hợp lệ không
    const users = await getAllUsers();
    const user = users.find(u => String(u.id) === String(decoded.id));
    if (!user) {
      return next(createError(401, "Unauthorized"));
    }
    //Đăng ký biến user global trong app
    res.locals.user = user;
    next();
  } catch (err) {
    return next(createError(403, "Forbidden"));
  }
};

export const authRoles = (roles: string[] = []) => {
  // roles param can be a single role string (e.g. 'Admin' or 'User') 
  // or an array of roles (e.g. ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = res.locals.user;
    if (roles.length && user.role && !roles.includes(user.role)) {
      return next(createError(403, 'Forbidden'));
    }
    // authentication and authorization successful
    next();
  }
}