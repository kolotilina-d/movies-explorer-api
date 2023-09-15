const httpConstans = require('http2').constants;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../utils/BadRequest');
const ConflictError = require('../utils/Conflict');
const { CONFLICT_ERROR } = require('../utils/constans');

const { JWT_SECRET = 'secret_key' } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(httpConstans.HTTP_STATUS_CREATED).send(
        {
          name: user.name,
          id: user._id,
          email: user.email,
        },
      );
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERROR));
      } else {
        next(err);
      }
    });
};

module.exports.editUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    email: req.body.email,
  }, { new: true, runValidators: true })
    .then((user) => res.status(httpConstans.HTTP_STATUS_OK).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERROR));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(httpConstans.HTTP_STATUS_OK).send({ email: user.email, name: user.name });
    })
    .catch((err) => {
      next(err);
    });
};
