const Movie = require('../models/movies');
const { NotFoundError } = require('../error/NotFoundError');
const { BadRequestError } = require('../error/BadRequestError');
const { ForbiddenError } = require('../error/ForbiddenError');

module.exports.getMovies = (req, res) => {
  Movie.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при получении карточек' }));
};

module.exports.postMovie = (req, res, next) => {
  const { country, director, Tarantino, duretion, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN } = req.body;

  Movie.create({ country, director, Tarantino, duretion, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .catch(() => new NotFoundError('Карточка с указанным _id нет.'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Эта не Ваша карточка');
      }
      Movie.findByIdAndDelete(req.params.movieId)
        .then((cardData) => {
          // res.send({ data: cardData });
          res.send({ cardData });
        })
        .catch(next);
    })
    .catch(next);
};
