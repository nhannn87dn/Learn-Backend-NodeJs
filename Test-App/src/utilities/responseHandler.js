const _ = require('lodash');

const sendJsonSuccess = (res, message, code) => {
  return (data, globalData) => {
    if (_.isUndefined(code)) {
      code = 200;
    }
    res.status(code).json({
      statusCode: code || 200,
      message: message || 'Success',
      data,
      ...globalData,
    });
  };
};

const sendJsonErrors = (req, res, error) => {
  console.log(error);
  return res.status(error.status || 500).json({
    statusCode: error.status || 500,
    message: error.message || 'Unhandled Error',
    error,
  });
};

module.exports = {
  sendJsonSuccess,
  sendJsonErrors,
};
