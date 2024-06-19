const { body, param } = require('express-validator');

const playerValidation = [
  body('vardas').notEmpty().withMessage('Name is required'),
  body('pavarde').notEmpty().withMessage('Surname is required'),
  body('amzius').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
  body('el_pastas').isEmail().withMessage('Email is invalid'),
  body('tournament_ID').isInt().withMessage('Tournament ID is invalid')
];
const addPlayerValidation = [
  param('tournamentId')
      .isInt().withMessage('Tournament ID must be an integer'),
  body('playerId')
      .isInt().withMessage('Player ID must be an integer')
];

module.exports = { playerValidation, addPlayerValidation };

