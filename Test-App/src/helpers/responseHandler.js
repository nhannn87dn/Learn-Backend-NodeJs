//const _ = require('lodash');

const sendJsonSuccess = (res, message, code) => {
  return (data, globalData) => {
    // if (_.isUndefined(code)) {
    //   code = 200;
    // }
    code = code || 200;
    res.status(code).json({
      statusCode: code,
      message: message || 'Success',
      data,
      ...globalData,
    });
  };
};

const sendJsonErrors = (req, res, error, type = null) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    statusCode: statusCode,
    errorType: type || 'error',
    message: error.message || 'Internal Server Error',
  });
};

module.exports = {
  sendJsonSuccess,
  sendJsonErrors,
};
