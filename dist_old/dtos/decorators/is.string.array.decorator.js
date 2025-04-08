"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsStringQueryArrayNumberRangeObject = exports.IsStringQueryArray = void 0;
const class_validator_1 = require("class-validator");
function IsStringQueryArray(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isStringQueryArray',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: Object.assign(Object.assign({}, validationOptions), { message: `${propertyName} should be array of non empty strings` }),
            validator: {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                validate(value, args) {
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
                    }
                    catch (e) {
                        return false;
                    }
                },
            },
        });
    };
}
exports.IsStringQueryArray = IsStringQueryArray;
function IsStringQueryArrayNumberRangeObject(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isStringQueryObjectNumberRange',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: Object.assign(Object.assign({}, validationOptions), { message: `${propertyName} should be array of object with from and to (both number)` }),
            validator: {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                validate(value, args) {
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
                    }
                    catch (e) {
                        return false;
                    }
                },
            },
        });
    };
}
exports.IsStringQueryArrayNumberRangeObject = IsStringQueryArrayNumberRangeObject;
//# sourceMappingURL=is.string.array.decorator.js.map