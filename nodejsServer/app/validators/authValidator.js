import { body } from 'express-validator';
import { validationCheck } from '../utils/validatorHelper.js';


const loginValidation = [
  body('el_pastas').isEmail().withMessage('Email is invalid'),
  body('slaptazodis').notEmpty().withMessage('Password is required'),
  validationCheck
];

export { loginValidation };
