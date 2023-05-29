const authService = require('../services/auth.service');
const responseHandler = require('../helpers/responseHandler');

exports.userLogin = async (req, res, next) => {
  console.log('1 ==> auth req', req.body);
  try {
    const user = await authService.userLogin(req.body);
    responseHandler.sendJsonSuccess(res)(user);
  } catch (err) {
    next(err);
  }
};
