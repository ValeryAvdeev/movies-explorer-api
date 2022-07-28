const router = require('express').Router();
const { moviePostValidation, deleteMovieValidation } = require('../middlewares/valtidation');

const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');

// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies
router.get('/', getMovies);

// # создаёт фильм с переданными в теле
// # country, director, duretion, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies
router.post('/', moviePostValidation, postMovie);

// # удаляет сохранённый фильм по id
// DELETE /movies/_id
router.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
