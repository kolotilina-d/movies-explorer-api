const httpConstans = require('http2').constants;
const { default: mongoose } = require('mongoose');
const Movie = require('../models/movie');
const BadRequest = require('../utils/BadRequest');
const NotFoundError = require('../utils/NotFound');
const ForbiddenError = require('../utils/Forbidden');
const { FORBIDDEN_ERROR, BAD_REQUEST, NOT_FOUND } = require('../utils/constans');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(httpConstans.HTTP_STATUS_OK).send(movies))
    .catch((err) => next(err));
};

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(httpConstans.HTTP_STATUS_CREATED).send(movie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(new NotFoundError(NOT_FOUND))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        next(new ForbiddenError(FORBIDDEN_ERROR));
      }
      Movie.deleteOne(movie)
        .then(() => {
          res
            .status(httpConstans.HTTP_STATUS_OK)
            .send({ message: 'Фильм удален' });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.CastError) {
            next(new BadRequest(BAD_REQUEST));
          } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
            next(new NotFoundError(NOT_FOUND));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequest(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};
