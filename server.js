// Framework goodness
const express = require('express');
const app = express();
const env = require('dotenv').config();
const mongoose = require('mongoose');

// variables
const port = process.env.PORT || 3000;
const url = process.env.URL || 'localhost';
const corsHeaders = require('./middleware/cors');

// Body parser
app.use(express.json());

// Set CORS headers
app.use(corsHeaders);

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
