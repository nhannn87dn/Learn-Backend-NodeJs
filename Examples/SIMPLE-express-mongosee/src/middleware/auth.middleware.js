const jwt = require('jsonwebtoken');
const {JWT_SECRET} =  process.env;
const users = require('../data/users.json');
const createError = require('http-errors');

const authenticateToken = async (req, res, next) => {
    //Lấy thông tin authorization từ trong header request ra
    const authHeader = req.headers['authorization'];
     //trích xuất token từ trong chuỗi authorization vừa lấy được
    const token = authHeader && authHeader.split(' ')[1];

    //Kiểm tra token có tồn tại không
    if (!token) {
      return next(createError(401, 'Unauthorized'));
    }

    //Nếu token tồn tại thì kiểm tra tính hợp lệ
    try {
      //Giải mã token để lấy thông tin
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(decoded);

      //Kiểm tra xem có tồn tại user với userId lấy được từ token không
      //Để tránh token giả mạo
      const user =  users.find((user) => user.id === decoded._id);
     

      if (!user) {
        return next(createError(401, 'Unauthorized'));
      }

      req.user = user;
      next();
    } catch (err) {
      console.log(err)
      return next(createError(403, 'Forbidden'));
    }
};

const authorize = (roles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (roles.length && !roles.includes(req.user.role)) {
            return next(createError(403, 'Forbidden'));
        }
        // authentication and authorization successful
        next();
    }
}

module.exports = {
    authorize,
    authenticateToken,
};