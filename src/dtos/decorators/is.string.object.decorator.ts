import { registerDecorator, ValidationOptions, ValidationArguments, isObject } from 'class-validator';
import { NumberRangeOption } from '../userDtos/diamond.dto';

export function IsStringQueryObjectNumberRange(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStringQueryObjectNumberRange',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: `${propertyName} should be object and not empty`,
      },
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          if (!value) {
            return true;
          }
          try {
            const parsedObject: NumberRangeOption = JSON.parse(value);
            if (!isObject(parsedObject)) {
              return false;
            }

            if (!('from' in parsedObject) && !('to' in parsedObject)) {
              return false;
            }
            if (parsedObject.from && isNaN(Number(parsedObject.from))) {
              return false;
            }
            if (parsedObject.to && isNaN(Number(parsedObject.to))) {
              return false;
            }
            return true;
          } catch (e) {
            return false;
          }
        },
      },
    });
  };
}

export function IsStringQueryObjectSortOrder(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsStringQueryObjectSortOrder',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: `${propertyName} should be object and not empty with valid sort order`,
      },
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          if (!value) {
            return true;
          }
          try {
            const parsedObject = JSON.parse(value);
            if (!isObject(parsedObject)) {
              return false;
            }

            for (const key in parsedObject) {
              const isValidSortOrder = parsedObject[key] === 1 || parsedObject[key] === -1;
              if (!isValidSortOrder) {
                return false;
              }
            }

            return true;
          } catch (e) {
            return false;
          }
        },
      },
    });
  };
}
