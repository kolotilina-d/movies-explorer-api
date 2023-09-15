const httpConstans = require('http2').constants;
const { INTERNAL_SERVER_ERROR } = require('../utils/constans');

module.exports.internalError = ((err, req, res, next) => {
  const { statusCode = httpConstans.HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === httpConstans.HTTP_STATUS_INTERNAL_SERVER_ERROR
      ? INTERNAL_SERVER_ERROR : message,
  });
  next();
});
