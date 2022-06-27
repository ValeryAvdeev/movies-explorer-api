const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'введен не верный email.'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Вася',
    minlength: 2,
    required: true,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
