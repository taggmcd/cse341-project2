const mogoose = require('mongoose');

const BookSchema = new mogoose.Schema({
  title: String,
  author: String,
  description: String,
  pages: Number,
  publicationDate: Date,
  completedDate: Date,
  isbn: Number,
});

module.exports = mogoose.model('book', BookSchema, 'books');
