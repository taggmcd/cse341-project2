// Framework goodness
const express = require('express');
const app = express();
const env = require('dotenv').config();
const mongoose = require('mongoose');

// variables
const port = process.env.PORT || 3000;
const url = process.env.URL || 'localhost';

// Body parser
app.use(express.json());

// Database
const mongodb = require('./database/mongo.js');

// mogoose, will move to database/mongo.js when fleshed out
// mongoose.mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log('Connected via mongoose');
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// Set CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  next();
});

// Routes
app.use('/', require('./routes'));

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
