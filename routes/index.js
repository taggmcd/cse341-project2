const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.use('/api-docs', require('./swagger'));

router.use('/books', require('./book.js'));

module.exports = router;
