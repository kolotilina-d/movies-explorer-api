const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnautorizedError = require('../utils/Unauthorized');
const { UNAUTHORIZED_ERROR } = require('../utils/constans');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля - 2 символа'],
      maxlength: [30, 'Максимальная длина поля - 30 сомволов'],
      required: [true, 'Поле должно быть заполнено'],
    },
    email: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      unique: true,
      validate: {
        validator: function checkUrl(email) {
          return email && validator.isEmail(email);
        },
        message: 'Введите верный email',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnautorizedError(UNAUTHORIZED_ERROR);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnautorizedError(UNAUTHORIZED_ERROR);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
