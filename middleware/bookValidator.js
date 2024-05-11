const { body, validationResult } = require('express-validator');

const bookValidator = [
  body('title').isString().isLength({ min: 1 }).withMessage('Name is required'),
  body('author')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Author is required'),
  body('description')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Description is required'),
  body('pages')
    .isNumeric()
    .withMessage('Pages is required and must be a number'),
  body('publicationDate').isDate().withMessage('Invalid format use YYYY-MM-DD'),
  body('completedDate')
    .isDate()
    .optional({ nullable: true, checkFalsy: true })
    .withMessage('Invalid format use YYYY-MM-DD'),
  body('isbn').isNumeric().withMessage('ISBN is required and must be a number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ errors: errors.array() });
  },
];

module.exports = bookValidator;
