const { body } = require('express-validator');
import { validationCheck } from '../utils/validatorHelper.js';

const refereeValidation = [
  body('vartotojo_ID').isInt().withMessage('User ID is invalid'),
  body('tournament_ID').isInt().withMessage('Tournament ID is invalid'),
  validationCheck
];

module.exports = { refereeValidation };