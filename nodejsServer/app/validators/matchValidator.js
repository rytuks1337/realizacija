import { body, param } from 'express-validator';
import { validationCheck } from '../utils/validatorHelper.js';

const matchUpdateValidation = [
  body('laimetojas')
    .notEmpty().withMessage("Must not be empty")
    .isInt({min:0}).withMessage('Participant 1 ID is invalid'),
  validationCheck
];

const foulAddValidation = [
  body('dalyvis_ID')
    .isInt().withMessage('Valid paricipant ID must be specified'),
  body('praz_tipas')
    .notEmpty().withMessage('Foul must be specified')
    .custom((value) =>{
        if(value === 'Elbow' || value === 'Hand' || value === 'FStart'){
          return true;
        }else return false;
      }),
  validationCheck
];

export { matchUpdateValidation, foulAddValidation };
