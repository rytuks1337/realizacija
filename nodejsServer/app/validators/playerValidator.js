const { body } = require('express-validator');

const playerValidation = [
  body('vardas').notEmpty().withMessage('Name is required'),
  body('pavarde').notEmpty().withMessage('Surname is required'),
  body('amzius').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
  body('el_pastas').isEmail().withMessage('Email is invalid'),
  body('tournament_ID').isInt().withMessage('Tournament ID is invalid')
];

module.exports = { playerValidation };
