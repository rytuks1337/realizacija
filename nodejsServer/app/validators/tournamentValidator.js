import { body } from 'express-validator';

const createTournamentValidation = [
    body('pavadinimas')
        .isString().withMessage('Must be a string.')
        .notEmpty().withMessage('Must not be empty.'),
    body('data')
        .isISO8601().withMessage('Nevalidus laiko formatas')
        .notEmpty().withMessage('Must not be emptya'),
    body('aprasas')
        .optional()
        .isString().withMessage('Must be a valid string.'),
    body('stalu_sk')
        .optional()
        .isInt({min: 1, max: 25}).withMessage('Table number must be from 1 to 25.'),
    body('lokacija')
        .isString().withMessage('Must type the location of the event')
        .notEmpty().withMessage('Must not be empty.'),
    body('pradzia')
        .isInt({min: 0, max: 23})
        .withMessage('A valid starting hour must be stated'),
    body('pabaiga')
        .optional()
        .isInt({min: 0, max: 23})
        .withMessage('Only a valid ending hour may be stated'),

];

export {createTournamentValidation}