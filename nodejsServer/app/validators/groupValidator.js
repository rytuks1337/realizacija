import {body } from 'express-validator';
import { validationCheck } from '../utils/validatorHelper.js';
import Ajv from 'ajv';



const schema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        V: {
          type: 'object',
          patternProperties: {
            '^[a-zA-Z]{1,50}$': {
              type: 'object',
              properties: {
                K: { type: "array", items: {type: 'string', pattern: '^\\+?\\d{1,3}$|^A$'} },
                D: { type: "array", items: {type: 'string', pattern: '^\\+?\\d{1,3}$|^A$'} },
                age: { type: 'string', pattern: '^\\d{1,3}\\+?$' }
              },
              required: ['K', 'D'],
              additionalProperties: false
            }
          },
          additionalProperties: false
        },
        M: {
          type: "object",
          patternProperties: {
            '^[a-zA-Z]{1,50}$': {
              type: "object",
              properties: {
                K: { type: "array", items: {type: 'string', pattern: '^\\+?\\d{1,3}$|^A$'} },
                D: { type: "array", items: {type: 'string', pattern: '^\\+?\\d{1,3}$|^A$'} },
                age: { type: "string", pattern: '^\\d{1,3}\\+?$' }
              },
              required: ['K', 'D'],
              additionalProperties: false
            }
          },
          additionalProperties: false
        }
      },
      required: ["V", "M"],
      additionalProperties: false
    }
  },
  required: ["data"],
  additionalProperties: false
};
const ajv = new Ajv();
const validate = ajv.compile(schema);

const createGrouptValidation = [
  body('data')
      .notEmpty().withMessage('Must not be empty')
      .custom((data) =>{
        try {
          const valid = validate({"data": data});
          if (valid) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          return {message: "Invalid JSON"};
        }

      }),
  validationCheck

];

export {createGrouptValidation};