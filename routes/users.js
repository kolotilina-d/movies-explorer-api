const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlRegexp } = require('../utils/constans');

const {
  getUser, editUser,
} = require('../controllers/users');

router.get('/users/me', getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().pattern(urlRegexp),
  }).unknown(true),
}), editUser);

module.exports = router;
