const httpConstans = require('http2').constants;
const { default: mongoose } = require('mongoose');
const Movie = require('../models/movie');
const BadRequest = require('../utils/BadRequest');
const NotFoundError = require('../utils/NotFound');
const ForbiddenError = require('../utils/Forbidden');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
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
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        next(new ForbiddenError('Фильм принадлежит другому пользователю'));
      }
      Movie.deleteOne(movie)
        .orFail()
        .then(() => {
          res
            .status(httpConstans.HTTP_STATUS_OK)
            .send({ message: 'Фильм удален' });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.CastError) {
            next(new BadRequest('Некорректный _id фильма'));
          } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
            next(new NotFoundError('Фильм с указанным _id не найден'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err.name === 'TypeError') {
        next(new NotFoundError('Фильм с указанным _id не найден'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequest('Некорректный _id фильма'));
      } else {
        next(err);
      }
    });
};
