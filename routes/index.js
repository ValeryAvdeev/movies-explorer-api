const router = require('express').Router();
const { login, registrationUser } = require('../controllers/users');
const { loginValidation, registrationValidation } = require('../middlewares/valtidation');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');

router.post('/signin', loginValidation, login);

router.post('/signup', registrationValidation, registrationUser);
router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

module.exports = router;
