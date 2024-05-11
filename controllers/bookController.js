const { response } = require('express');
const mongoose = require('mongoose');
const Book = require('../database/schema/book');

const index = async (req, res) => {
  //#swagger.tags = ['Books']

  // Get all book from mongodb
  try {
    const books = await Book.find();
    if (books.length === 0) {
      res.status(200).json({ message: `No books found` });
    } else {
      res.status(200).json(books);
    }
  } catch (error) {
    res.status(500).json({ message: `Server Error, Try again later` });
  }
};

const show = async (req, res) => {
  //#swagger.tags = ['Books']

  // Get a single book from mongodb
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      res.status(200).json({ message: `BookId ${id} not found` });
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    res.status(500).json({ message: `Server Error, Try again later` });
  }
};

const store = async (req, res) => {
  //#swagger.tags = ['Books']

  // Create a new book in mongodb
  const {
    title,
    author,
    description,
    completed,
    publicationDate,
    completedDate,
    isbn,
  } = req.body;
  const book = new Book({
    title,
    author,
    description,
    completed,
    publicationDate,
    completedDate,
    isbn,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: `Error creating book` });
  }
};

const update = async (req, res) => {
  //#swagger.tags = ['Books']

  // Update a book in mongodb
  const { id } = req.params;
  const {
    title,
    author,
    description,
    completed,
    publicationDate,
    completedDate,
    isbn,
  } = req.body;
  try {
    const book = await Book.findById(id);
    book.title = title;
    book.author = author;
    book.description = description;
    book.completed = completed;
    book.publicationDate = publicationDate;
    book.completedDate = completedDate;
    book.isbn = isbn;
    const updatedBook = await book.save();
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: `BookId ${id} could not be updated` });
  }
};

const destroy = async (req, res) => {
  //#swagger.tags = ['Books']

  // Delete a book from mongodb
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    await book.deleteOne();
    res.status(200).json({ message: `BookId ${id} deleted` });
  } catch (error) {
    res.status(500).json({ message: `BookId ${id} could not be deleted` });
  }
};

module.exports = { index, show, store, update, destroy };
