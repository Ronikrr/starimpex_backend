import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';

/**
 * @name ValidationMiddleware
 * @description Allows use of decorator and non-decorator based validation
 * @param type dto
 * @param skipMissingProperties When skipping missing properties
 * @param whitelist Even if your object is an instance of a validation class it can contain additional properties that are not defined
 * @param forbidNonWhitelisted If you would rather to have an error thrown when any non-whitelisted properties are present
 */
const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(type, req[value]);
    validateOrReject(dto, { skipMissingProperties, whitelist, forbidNonWhitelisted })
      .then(() => {
        next();
      })
      .catch((errors: ValidationError[]) => {
        const message = errors
          .map((error: ValidationError) => {
            if (error?.constraints) {
              return Object.values(error.constraints);
            }

            if (error?.children) {
              return `Invalid ${error.property}`;
            }
          })
          .join(', ');
        next(new HttpException(400, message));
      });
  };
};

export default validationMiddleware;
