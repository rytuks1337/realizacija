const { body, param } = require('express-validator');

const createTournamentValidation = [
    body('pavadinimas')
        .isString().withMessage('Pavadinimas turi būti teksto kintamasis.')
        .notEmpty().withMessage('Kintamasis privalo būti netuščias.'),
    body('data')
        .isISO8601().withMessage('Nevalidus laiko formatas')
        .notEmpty().withMessage('Privalo būti nustatyta data'),
    body('aprasas')
        .optional()
        .isString().withMessage('Aprašas privalo būti teksto kintamasis'),
];

module.exports = {createTournamentValidation}