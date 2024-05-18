const router = require('express').Router();
const bookController = require('../controllers/bookController');
const bookValidator = require('../middleware/bookValidator');
const bookIdValidator = require('../middleware/bookIdValidator');
const isAuthenticated = require('../middleware/auth');

router.get('/', bookController.index);

router.get('/:id', bookIdValidator, bookController.show);

router.post('/', isAuthenticated, bookValidator, bookController.store);

router.put(
  '/:id',
  isAuthenticated,
  bookIdValidator,
  bookValidator,
  bookController.update
);

router.delete('/:id', isAuthenticated, bookIdValidator, bookController.destroy);

module.exports = router;
