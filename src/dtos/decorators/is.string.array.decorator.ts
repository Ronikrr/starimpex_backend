import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { NumberRangeOption } from '../userDtos/diamond.dto';

export function IsStringQueryArray(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStringQueryArray',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: `${propertyName} should be array of non empty strings`,
      },
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          if (!value) {
            return true;
          }
          try {
            const parsedArray = JSON.parse(value);
            const isArray = Array.isArray(parsedArray);
            if (!isArray) {
              return false;
            }
            for (const item of parsedArray) {
              if (typeof item !== 'string' || item.trim() === '') {
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

export function IsStringQueryArrayNumberRangeObject(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStringQueryObjectNumberRange',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: `${propertyName} should be array of object with from and to (both number)`,
      },
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          if (!value) {
            return true;
          }
          try {
            const parsedArray: NumberRangeOption[] = JSON.parse(value);
            const isArray = Array.isArray(parsedArray);
            if (!isArray) {
              return false;
            }

            for (const item of parsedArray) {
              if (!('from' in item) && !('to' in item)) {
                return false;
              }
              if (item.from && isNaN(Number(item.from))) {
                return false;
              }
              if (item.to && isNaN(Number(item.to))) {
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
