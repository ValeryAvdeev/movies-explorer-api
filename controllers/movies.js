const Movie = require('../models/movies');
const { NotFoundError } = require('../error/NotFoundError');
const { BadRequestError } = require('../error/BadRequestError');
const { ForbiddenError } = require('../error/ForbiddenError');

module.exports.getMovies = (req, res) => {
  Movie.find({ owner: req.user._id })
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при получении фильма' }));
};

module.exports.postMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(`Фильма с указанным ${req.params.movieId} нет.`))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Эта не Ваша карточка');
      }
      Movie.findByIdAndDelete(req.params.movieId)
        .then((movieData) => {
          res.send({ movieData });
        })
        .catch(next);
    })
    .catch((e) => next(e));
};
