const router = require('express').Router();

router.use('/github', require('./auth/github.js'));

module.exports = router;
