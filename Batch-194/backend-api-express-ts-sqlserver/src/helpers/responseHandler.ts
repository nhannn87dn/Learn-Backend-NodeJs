import { Response } from "express";
import { Status, SUCCESS, ERROR } from "../constants/responseConstants";

/**
 * Mặc định trả về status 200
 *
 */
export const sendJsonSuccess = ({
  res,
  status = SUCCESS.OK,
  data = null,
}: {
  res: Response;
  status?: Status;
  data?: any;
}): void => {
  res.status(status.statusCode).json({
    statusCode: status.statusCode,
    message: status.message,
    data,
  });
};

/**
 * Mặc định trả về status 500
 *
 */
export const sendJsonError = ({
  res,
  status = ERROR.SERVER_ERROR,
}: {
  res: Response;
  status: Status;
}): void => {
  res.status(status.statusCode).json({
    statusCode: status.statusCode,
    message: status.message,
    data: null,
  });
};

export { SUCCESS, ERROR };
