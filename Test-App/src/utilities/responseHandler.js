const _ = require('lodash');

const jsonSuccess = (res, message, code) => {
  return (data, globalData) => {
    if (_.isUndefined(code)) {
      code = 200;
    }
    res.status(code).json({
      status: code || 0,
      message: message || 'Success',
      data,
      ...globalData,
    });
  };
};
const jsonErrors = (res, message, code) => {
  return (data, globalData) => {
    res.status(code).json({
      status: code || 1,
      message: message || 'Fail',
    });
  };
};

module.exports = {
  jsonSuccess,
  jsonErrors,
};
