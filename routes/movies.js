const router = require('express').Router();

const {
  getMovies, postMovie, deleteMovie,
} = require('../controllers/movies');
const { validatorPostMovie, validatorDeleteMovie } = require('../utils/CelebrateValidations');

router.get('/', getMovies);

router.post('/', validatorPostMovie, postMovie);

router.delete('/:_id', validatorDeleteMovie, deleteMovie);

module.exports = router;
