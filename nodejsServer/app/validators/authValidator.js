import { body } from 'express-validator';


const loginValidation = [
  body('el_pastas').isEmail().withMessage('Email is invalid'),
  body('slaptazodis').notEmpty().withMessage('Password is required')
];

export { loginValidation };
