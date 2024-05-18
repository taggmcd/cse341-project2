// Framework goodness
const express = require('express');
const app = express();
const env = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const GitHubStrategy = require('passport-github').Strategy;

// variables
const port = process.env.PORT || 3000;
const url = process.env.URL || 'localhost';
const corsHeaders = require('./middleware/cors');

// Passport
app
  .use(
    session({
      cookie: { maxAge: 86400000 },
      store: new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
      secret: 'SuperSecretKey',
      resave: false,
      saveUninitialized: true,
    })
  )
  .use(passport.initialize())
  .use(passport.session());

// Body parser
app.use(express.json());

// Set CORS headers
app.use(corsHeaders);

// Passport GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Database
const mongodb = require('./database/mongo.js');

// Routes
app.use('/', require('./routes'));

// Error handling
process.on('uncaughtException', (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

// Connect to MongoDB and start the server
mongodb.init((err) => {
  if (err) {
    console.error(err);
  }
  console.log('Connected to MongoDB');

  app.listen(port, () => {
    console.log(`Server is running at http://${url}:${port}`);
  });
});
