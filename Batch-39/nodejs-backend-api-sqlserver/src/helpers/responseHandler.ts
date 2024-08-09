import { Response } from 'express';

// Hàm gởi khi thành công
const sendJsonSuccess = (res: Response, message = 'Success', code = 200) => {
  return (data: any = null) => {
    const resData = data ? { 
      statusCode: code, 
      message, 
      data
    } : { statusCode: code, message};
    res.status(code).json(resData);
  };
};

// Hàm gởi khi có lỗi
const sendJsonErrors = (res: Response, error: any) => {
  //console.log(error);
  return res.status(error.status || 500).json({
    statusCode: error.status || 500,
    message: error.message || 'Unhandled Error',
    data: null
  });
};

export {
  sendJsonSuccess,
  sendJsonErrors,
};