const { body, validationResult } = require('express-validator');

const validateUser = [
  body('name').optional().isString().withMessage('Name must be a string'),
  body('email').isEmail().withMessage('Valid email is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

module.exports = { validateUser };
