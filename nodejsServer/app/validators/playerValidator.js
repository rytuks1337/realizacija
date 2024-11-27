import { body, param } from 'express-validator';
import { validationCheck } from '../utils/validatorHelper.js';
import { INTEGER } from 'sequelize';

const playerValidation = [
  body('vardas')
    .optional()
    .isString().withMessage("Valid string is required")
    .isLength({max: 50}).withMessage("Exceeded maximum number of characters"),
  body('pavarde')
    .optional()
    .isString().withMessage("Valid string is required")
    .isLength({max: 50}).withMessage("Exceeded maximum number of characters"),
  body('amzius')
    .optional()
    .custom((value, {req})=>{
      
      if (req.body.role !== "Participant") {
        return true;
      }
      if (!value) {
        throw new Error('Provide the year the user was born');
      }
      return true;
    })
    .isDate().withMessage('Invalid date format, yyyy-mm-dd'),
  body('lytis')
    .optional()
    .custom((value) => {
      if(value === 'M' || value === 'F'){
        return true;
      }
      return false;
    }).withMessage('Please enter a valid gender (M/F)'),
  body('svoris')
    .optional()
    .custom((value, {req})=>{
      if (req.body.role !== "Participant") {
        return true;
      }
      if (!value) {
        throw new Error('Weight must be present when creating registering a player');
      }
      return true; // Validation passes
    })
    .isFloat({ min: 1.00, max: 999.00 }).withMessage('Weight must be a positive Float'),
  body('uuid')
    .optional()
    .custom((value, {req})=>{
      if (req.body.role !== "Participant") {
        return true;
      }
      if (!value) {
        throw new Error('uuid must be present');
      }
      return true; // Validation passes
    })
    .isUUID().withMessage("Please provide a valid users ID"),
  body('role')
    .notEmpty().withMessage("Enter the role of this person")
    .custom((value) =>{
      if(value === 'Organizer' || value === 'Judge' || value === 'Participant' || value === 'Owner'){
        return true;
      }else return false;
    }).withMessage("Invalid role specified"),
  body('grupes')
    .optional()
    .custom((value, {req})=>{
      if (req.body.role !== "Participant") {
        return true;
      }
      if (!value) {
        throw new Error('Must specify the group(-s) to join');
      }
      return true; // Validation passes
    })
    .isInt().withMessage("Invalid format")
    .custom((value)=>{
      value.forEach(element => {
        if(Number.isInteger(element) === false){
          return false;
        }
      });
      return true;
    }).withMessage("Array must consist of only valid group ID's"),
  validationCheck
];

const playerValidationEdit = [
  body('vardas')
    .optional()
    .isString().withMessage("Valid string is required")
    .isLength({max: 50}).withMessage("Exceeded maximum number of characters"),
  body('pavarde')
    .optional()
    .isString().withMessage("Valid string is required")
    .isLength({max: 50}).withMessage("Exceeded maximum number of characters"),
  body('amzius')
    .optional()
    .isDate().withMessage('Invalid date format, yyyy-mm-dd'),
  body('lytis')
    .optional()
    .custom((value) => {
      if(value === 'M' || value === 'F'){
        return true;
      }
      return false;
    }).withMessage('Please enter a valid gender (M/F)'),
  body('svoris')
    .optional()
    .isFloat({ min: 1.00, max: 999.00 }).withMessage('Weight must be a positive Float'),
  body('uuid')
    .optional()
    .isUUID().withMessage("Please provide a valid users ID"),
  body('role')
    .notEmpty().withMessage("Enter the role of this person")
    .custom((value) =>{
      if(value === 'Organizer' || value === 'Judge' || value === 'Participant' || value === 'Owner'){
        return true;
      }else return false;
    }).withMessage("Invalid role specified"),
  body('grupes')
    .optional()
    .isArray().withMessage("Invalid format")
    .custom((value)=>{
      value.forEach(element => {
        if(Number.isInteger(element) === false){
          return false;
        }
      });
      return true;
    }).withMessage("Array must consist of only valid group ID's"),
  validationCheck
];

const judgeValidation = [
  body('uuid')
]

const addPlayerValidation = [
  param('tournamentId')
    .notEmpty().withMessage("Tournament ID must be present")
    .isInt().withMessage('Tournament ID must be an integer'),
  body('playerId')
    .notEmpty().withMessage("Valid user required")
    .isInt().withMessage('Player ID must be an integer'),
    validationCheck
  
];

export { playerValidation, playerValidationEdit, addPlayerValidation };

