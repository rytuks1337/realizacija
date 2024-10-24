import { param } from 'express-validator';

const uuidParamValidation = [
  param('uuid').notEmpty().isUUID().withMessage("Please provide a valid users ID")

];

export { uuidParamValidation };
