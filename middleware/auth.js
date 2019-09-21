const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.REACT_APP_JWT_SECRET;

module.exports = function(req, res, next) {
  const userToken = req.header('x-auth-token');

  if (!userToken) {
    return res.status(401).json({ errors: ['Token not found'] });
  }

  try {
    const decoded = jwt.verify(userToken, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        msg: 'Your session has expired. Please login to continue.',
        expiredToken: true,
        error: true
      });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        msg: 'In order to continue, you must sign in.',
        expiredToken: false,
        error: true
      });
    } else
      return res.status(401).json({
        msg:
          'There was an error retrieving your account information. Please try signing in.',
        expiredToken: false,
        error: true
      });
  }
};
