import { Response } from "express";
import { Status, SUCCESS, ERROR } from "../constants/responseConstants";

/**
 * Mặc định trả về status 200
 *
 */
export const sendJsonSuccess = (
  res: Response,
  status: Status = SUCCESS.OK,
  data: any = null
) => {
  return (data: any = null) => {
    const resData = data
      ? { statusCode: status.statusCode, message: status.message, data }
      : { statusCode: status.statusCode, message: status.message };
    res.status(status.statusCode).json(resData);
  };
};

/**
 * Mặc định trả về status 500
 *
 */
export const sendJsonError = (
  res: Response,
  status: Status = ERROR.SERVER_ERROR,
  data: any = null
) => {
  return (data: any = null) => {
    const resData = data
      ? { statusCode: status.statusCode, message: status.message, data }
      : { statusCode: status.statusCode, message: status.message };
    res.status(status.statusCode).json(resData);
  };
};

export { SUCCESS, ERROR };
