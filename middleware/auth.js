const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.REACT_APP_JWT_SECRET;

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res
      .status(401)
      .json({ errors: ['Something went wrong. Please try again'] });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ errors: ['Token is invalid'] });
  }
};
