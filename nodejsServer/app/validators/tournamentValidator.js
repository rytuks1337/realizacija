import {param, body } from 'express-validator';
import { validationCheck } from '../utils/validatorHelper.js';

const createTournamentValidation = [
    body('pavadinimas')
        .isString().withMessage('Must be a string.')
        .notEmpty().withMessage('Must not be empty.')
        .isLength({max: 100}).withMessage("Exceeded maximum number of characters"),
    body('data')
        .isISO8601().withMessage('Invalid time format')
        .notEmpty().withMessage('Must not be empty'),
    body('aprasas')
        .optional()
        .isString().withMessage('Must be a valid string.')
        .isLength({max: 4096}).withMessage("Exceeded maximum number of characters"),
    body('stalu_sk')
        .optional()
        .isInt({min: 1, max: 25}).withMessage('Table number must be from 1 to 25.'),
    body('lokacija')
        .isString().withMessage('Must type the location of the event')
        .notEmpty().withMessage('Must not be empty.')
        .isLength({max: 50}).withMessage("Exceeded maximum number of characters"),
    body('pradzia')
        .optional()
        .isInt({min: 0, max: 23})
        .withMessage('A valid starting hour (0-23) must be stated'),
    body('pabaiga')
        .optional()
        .isInt({min: 0, max: 23})
        .withMessage('Only a valid ending hour (0-23) may be stated'),
    validationCheck

];
const pageParamValidation = [
    param('page')
        .optional()
        .isInt({min: 1, max: 9999}).withMessage('Enter a valid page number.'),
    validationCheck

];

export {createTournamentValidation, pageParamValidation}