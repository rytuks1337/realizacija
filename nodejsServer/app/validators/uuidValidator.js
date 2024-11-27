import { param } from 'express-validator';
import { validationCheck } from '../utils/validatorHelper.js';

const uuidParamValidation = [
  param('uuid').notEmpty().withMessage("Valid UUID required").isUUID().withMessage("Please provide a valid users ID"),
  validationCheck
];

export { uuidParamValidation };
