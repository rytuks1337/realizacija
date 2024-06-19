const { body } = require('express-validator');

const registerValidation = [
  body('vardas').notEmpty().withMessage('Name is required'),
  body('pavarde').notEmpty().withMessage('Surname is required'),
  body('amzius').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
  body('el_pastas').isEmail().withMessage('Email is invalid'),
  body('slaptazodis').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const loginValidation = [
  body('el_pastas').isEmail().withMessage('Email is invalid'),
  body('slaptazodis').notEmpty().withMessage('Password is required')
];

module.exports = { registerValidation, loginValidation };
