const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies, postMovie, deleteMovie,
} = require('../controllers/movies');
const { urlRegexp } = require('../utils/constans');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegexp),
    trailerLink: Joi.string().required().pattern(urlRegexp),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(urlRegexp),
    movieId: Joi.number().required(),
  }).unknown(true),
}), postMovie);

router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
