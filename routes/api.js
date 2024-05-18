const router = require('express').Router();

router.use('/books', require('./book.js'));

module.exports = router;
