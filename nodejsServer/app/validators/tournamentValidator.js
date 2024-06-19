const { body, param } = require('express-validator');

const createTournamentValidation = [
    body('name')
        .isString().withMessage('Tournament name must be a string')
        .notEmpty().withMessage('Tournament name is required'),
    body('date')
        .isISO8601().withMessage('Invalid date format')
        .notEmpty().withMessage('Date is required'),
    body('description')
        .optional()
        .isString().withMessage('Description must be a string')
];

module.exports = {createTournamentValidation}