import { body } from 'express-validator';
import { validationCheck } from '../utils/validatorHelper.js';

const registerValidation = [
  body('vardas')
    .notEmpty().withMessage("A valid name is required")
    .isString().withMessage("Valid string is required")
    .isLength({max: 50}).withMessage("Exceeded maximum number of characters"),
  body('pavarde')
    .notEmpty().withMessage("A valid surname is required")
    .isString().withMessage("Valid string is required")
    .isLength({max: 50}).withMessage("Exceeded maximum number of characters"),
  body('amzius')
    .notEmpty().withMessage('Provide the year the user was born')
    .isDate().withMessage('Invalid date format, yyyy-mm-dd'),
  body('svoris')
    .optional()
    .isFloat({ min: 1.00, max: 999.00 }).withMessage('Weight must be a positive Float'),
  body('el_pastas')
    .notEmpty().withMessage("A valid email is required")
    .isEmail().withMessage('Invalid Email')
    .isLength({max: 50}).withMessage("Exceeded maximum number of characters"),
  body('slaptazodis')
    .notEmpty().withMessage("Valid password is required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/).withMessage('Password must be at least 8 characters long, have 1 uppercase, 1 lowercase and 1 special character'),
  body('lytis')
    .notEmpty().withMessage("Valid gender is required")
    .custom((value) => {
      if(value === 'M' || value === 'F'){
        return true;
      }
      return false;
    }).withMessage('Please enter a valid gender (M/F)'),
    
  
  validationCheck
];

const userEditValidation = [
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
    .isDate().withMessage('Invalid date format, yyyy-mm-dd'),,
  body('svoris')
    .optional()
    .isFloat({ min: 1.00, max: 999.00 }).withMessage('Weight must be a positive Float'),
  body('el_pastas')
    .optional()
    .isEmail().withMessage('Invalid Email')
    .isLength({max: 50}).withMessage("Exceeded maximum number of characters"),
  body('slaptazodis')
    .optional()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/).withMessage('Password must be at least 8 characters long, have 1 uppercase, 1 lowercase and 1 special character'),
  body('lytis')
    .optional()
    .custom((value) => {
      if(value === 'M' || value === 'F'){
        return true;
      }
      return false;
    }).withMessage('Please enter a valid gender (M/F)'),
  validationCheck
];

export { registerValidation, userEditValidation };
