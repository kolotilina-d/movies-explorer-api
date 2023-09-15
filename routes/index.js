const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../utils/NotFound');
const { validatorCreateUser, validatorLogin } = require('../utils/CelebrateValidations');
const { NOT_FOUND } = require('../utils/constans');

router.post('/signup', validatorCreateUser, createUser);

router.post('/signin', validatorLogin, login);

router.use(auth);
router.use('/', usersRouter);
router.use('/movies', moviesRouter);
router.all('/*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND));
});

module.exports = router;
