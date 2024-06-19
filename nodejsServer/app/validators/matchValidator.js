const { body } = require('express-validator');

const tournamentValidation = [
  body('pavadinimas').notEmpty().withMessage('Tournament name is required'),
  body('data').isDate().withMessage('Date is invalid'),
  body('pradzia').isString().withMessage('Start time is required'),
  body('pabaiga').isString().withMessage('End time is required'),
  body('aprasas').notEmpty().withMessage('Description is required'),
  body('organizatoriusVartotojo_ID').isInt().withMessage('Organizer ID is invalid'),
  body('var_pogrupiai_ID').isInt().withMessage('Group ID is invalid')
];

module.exports = { tournamentValidation };
