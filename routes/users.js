const router = require('express').Router();
const { createMeValidation } = require('../middlewares/valtidation');
const {
  createMe,
  getMe,
} = require('../controllers/users');

// # возвращает информацию о пользователе (email и имя)
// GET /users/me
router.get('/me', getMe);

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me
router.patch('/me', createMeValidation, createMe);

module.exports = router;
