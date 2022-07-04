const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { NotFoundError } = require('../error/NotFoundError');
const { BadRequestError } = require('../error/BadRequestError');
const { ConflictError } = require('../error/ConflictError');
const { AuthorizationError } = require('../error/AuthorizationError');

// # проверяет переданные в теле почту и пароль
// # и возвращает JWT
// POST /signin
module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AuthorizationError('неверный логин или пароль');
    } else {
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        throw new AuthorizationError('неверный логин или пароль');
      }
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token }).end();
    }
  } catch (e) {
    next(e);
  }
};

// # создаёт пользователя с переданными в теле
// # email, password и name
// POST /signup
module.exports.registrationUser = async (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email, password: hashPassword, name,
    });

    res.status(200).send({
      email: user.email,
      name: user.name,
    });
  } catch (e) {
    if (e.code === 11000) {
      next(new ConflictError('Пользователь с таким email существует'));
    } else if (e.name === 'ValidationError' || e.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(e);
    }
  }
};

module.exports.getMe = async (req, res, next) => {
  try {
    const userMe = await User.findById(req.user._id);
    if (userMe) {
      res.send(userMe);
    }
  } catch (e) {
    next(e);
  }
};

module.exports.createMe = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные профиля.'));
      } else {
        next(err);
      }
    });
};
