import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import Staff from "../models/Staff.model";
import { decodedJWT, verifyToken } from "../utils/token.util";


export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Get the jwt token from the head
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log('<<=== 🚀 authHeader ===>>',authHeader);
  console.log('<<=== 🚀 token ===>>',token);

  //If token is not valid, respond with 401 (unauthorized)
  if (!token) {
    return next(createError(401, "Unauthorized"));
  }

  try {
    const decoded = verifyToken(token) as decodedJWT;

    console.log('<<=== 🚀 decoded ===>>',decoded);
    //Kiểm tra xem thông tin chứa trong token có hợp lệ không
    const staff = await Staff.findById(decoded.id);

    if (!staff) {
      return next(createError(401, "Unauthorized"));
    }
    //Đăng ký biến staff global trong app
    res.locals.staff = staff;

    next();
  } catch (err) {
    return next(createError(403, "Forbidden"));
  }
};


export const authRoles = (roles: string[] = []) => {
    // roles param can be a single role string (e.g. Role.Staff or 'Staff') 
    // or an array of roles (e.g. [Role.Admin, Role.Staff] or ['Admin', 'Staff'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req: Request, res: Response, next: NextFunction) => {
      if (roles.length && res.locals.staff.roles && !res.locals.staff.roles.some((role: string) => roles.includes(role))) {
        return next(createError(403, 'Forbidden'));
      }
        // authentication and authorization successful
        next();
    }
}