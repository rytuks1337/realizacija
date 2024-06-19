const { body } = require('express-validator');

const refereeValidation = [
  body('vartotojo_ID').isInt().withMessage('User ID is invalid'),
  body('tournament_ID').isInt().withMessage('Tournament ID is invalid')
];

module.exports = { refereeValidation };
