const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    director: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле должно быть заполнено'],
    },
    year: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    description: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    image: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: {
        validator: function checkUrl(URL) {
          return URL && validator.isURL(URL);
        },
        message: 'Введите верный email',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: {
        validator: function checkUrl(URL) {
          return URL && validator.isURL(URL);
        },
        message: 'Введите корректную ссылку',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: {
        validator: function checkUrl(URL) {
          return URL && validator.isURL(URL);
        },
        message: 'Введите корректную ссылку',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Поле должно быть заполнено'],
    },
    movieId: {
      type: Number,
      required: [true, 'Поле должно быть заполнено'],
    },
    nameRU: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
