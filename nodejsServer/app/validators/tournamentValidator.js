import {param, body, query } from 'express-validator';
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
        .matches(/^\d\d:\d\d/)
        .withMessage('A valid starting hour (00:00-23:00) must be stated'),
    body('pabaiga')
        .optional()
        .matches(/^\d\d:\d\d/)
        .withMessage('Only a valid ending hour (00:00-23:00) may be stated'),
    validationCheck

];
const pageParamValidation = [
    param('page')
        .optional()
        .isInt({min: 1, max: 9999}).withMessage('Enter a valid page number.'),
    validationCheck

];

const searchValidation = [
    query('search')
        .optional()
        .isString().withMessage("Must be a string"),
    query('isMine')
        .optional()
        .isBoolean().withMessage("Must be either true or false"),
    query('hasPermisions')
        .optional()
        .isBoolean().withMessage("Must be either true or false"),
    query('participant')
        .optional()
        .isBoolean().withMessage("Must be either true or false"),
    validationCheck
];

export {createTournamentValidation, pageParamValidation, searchValidation}