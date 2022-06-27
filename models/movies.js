const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  // страна создания фильма. Обязательное поле-строка
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // режиссёр фильма. Обязательное поле-строка
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // длительность фильма. Обязательное поле-число
  duretion: {
    type: Number,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // год выпуска фильма. Обязательное поле-строка
  year: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // описание фильма. Обязательное поле-строка
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом
  image: {
    type: String,
    required: true,
    validate: [validator.isURL, 'введите URL адрес'],
  },
  // ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом
  trailerLink: {
    type: String,
    required: true,
    validate: [validator.isURL, 'введите URL адрес'],
  },
  // миниатюрное изображение постера к фильму.
  // .Обязательное поле-строка. Запишите её URL-адресом.
  thumbnail: {
    type: String,
    required: true,
    validate: [validator.isURL, 'введите URL адрес'],
  },
  // _id пользователя, который сохранил фильм. Обязательное поле
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле
  // ===================
  // ВРЕМЕННОЕ РЕШЕНИЕ
  // ===================
  movieId: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // название фильма на русском языке. Обязательное поле-строка
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // название фильма на английском языке. Обязательное поле-строка.
  nameEn: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // likes: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'user',
  //     default: [],
  //   },
  // ],
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = mongoose.model('movie', movieSchema);
