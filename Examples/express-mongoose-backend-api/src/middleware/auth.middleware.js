const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const {JWT_SECRET} = require('../constants/configs')


const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return next(createError(401, 'Unauthorized'));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded._id);

      if (!user) {
        return next(createError(401, 'Unauthorized'));
      }

      req.user = user;
      next();
    } catch (err) {
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