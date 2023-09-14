const router = require('express').Router();

const {
  getUser, editUser,
} = require('../controllers/users');
const { validatorEditUser } = require('../utils/CelebrateValidations');

router.get('/users/me', getUser);

router.patch('/users/me', validatorEditUser, editUser);

module.exports = router;
