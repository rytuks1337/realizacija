import {param, body } from 'express-validator';
import { validationCheck } from '../utils/validatorHelper.js';

const createTournamentValidation = [
    body('')
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

];
const pageParamValidation = [
    param('page')
        .optional()
        .isInt({min: 1, max: 9999}).withMessage('Enter a valid page number.'),
    validationCheck

];

export {createTournamentValidation, pageParamValidation}