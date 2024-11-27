import { body, param } from 'express-validator';
import { validationCheck } from '../utils/validatorHelper.js';

const matchValidation = [
  body('dalyvio_ID')
    .isEmpty().withMessage("Must not be emty")
    .isInt({min:0}).withMessage('Participant 1 ID is invalid'),
  body('dalyvio2_ID')
    .isEmpty().withMessage("Must not be emty")
    .isInt({min:0}).withMessage('Participant 2 ID is invalid'),
  body('laimetojoDalyvio_ID')
    .optional().isInt({min:0}).withMessage('Winner ID is invalid'),
  body('teisejasDalyvio_ID')
    .isEmpty().withMessage("Must not be emty")
    .isInt({min:0}).withMessage('Referee ID is invalid'),
  body('varzybu_ID')
    .isEmpty().withMessage("Must not be emty")
    .isInt({min:0}).withMessage('Tournament ID is invalid'),
  body('pogrupis_ID')
    .isEmpty().withMessage("Must not be emty")
    .isInt({min:0}).withMessage('Group ID is invalid'),
  validationCheck
];

const logActionValidation = [
  body('matchID')
    .isInt().withMessage('Match ID is invalid'),
  body('action')
    .notEmpty().withMessage('Action is required'),
  validationCheck
];

module.exports = { matchValidation, logActionValidation };
