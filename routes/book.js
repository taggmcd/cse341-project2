const router = require('express').Router();
const bookController = require('../controllers/bookController');
const bookValidator = require('../middleware/bookValidator');
const bookIdValidator = require('../middleware/bookIdValidator');

router.get('/', bookController.index);

router.get('/:id', bookIdValidator, bookController.show);

router.post('/', bookValidator, bookController.store);

router.put('/:id', bookIdValidator, bookValidator, bookController.update);

router.delete('/:id', bookIdValidator, bookController.destroy);

module.exports = router;
