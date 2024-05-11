const env = require('dotenv').config();
const mongoose = require('mongoose');

const init = (callback) => {
  mongoose.mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      return callback();
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = { init };
