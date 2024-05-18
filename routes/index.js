const passport = require('passport');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : 'Not logged in'
  );
});

router.use('/api-docs', require('./swagger'));

router.use('/auth', require('./auth.js'));

router.use(
  '/login',
  passport.authenticate('github', (req, res) => {})
);

router.use('/logout', (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });
});

router.use('/api', require('./api.js'));

module.exports = router;
