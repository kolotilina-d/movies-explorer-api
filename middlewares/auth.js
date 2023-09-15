const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/Unauthorized');
const { UNAUTHORIZED_ERROR } = require('../utils/constans');

const { JWT_SECRET = 'secret_key' } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(UNAUTHORIZED_ERROR));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(UNAUTHORIZED_ERROR));
  }
  req.user = payload;
  next();
};
