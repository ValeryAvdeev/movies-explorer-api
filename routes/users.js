const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createMe,
  getMe,
} = require('../controllers/users');

// # возвращает информацию о пользователе (email и имя)
// GET /users/me
router.get('/me', getMe);

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
  }),
}), createMe);

module.exports = router;
