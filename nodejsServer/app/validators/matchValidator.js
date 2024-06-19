const { body } = require('express-validator');

const matchValidation = [
  body('dalyvio_ID').isInt().withMessage('Participant 1 ID is invalid'),
  body('dalyvio2_ID').isInt().withMessage('Participant 2 ID is invalid'),
  body('laimetojoDalyvio_ID').optional().isInt().withMessage('Winner ID is invalid'),
  body('teisejasDalyvio_ID').isInt().withMessage('Referee ID is invalid'),
  body('varzybu_ID').isInt().withMessage('Tournament ID is invalid'),
  body('pogrupis_ID').isInt().withMessage('Group ID is invalid')
];

const logActionValidation = [
  body('matchID').isInt().withMessage('Match ID is invalid'),
  body('action').notEmpty().withMessage('Action is required')
];

module.exports = { matchValidation, logActionValidation };
