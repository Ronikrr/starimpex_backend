"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsStringQueryObjectSortOrder = exports.IsStringQueryObjectNumberRange = void 0;
const class_validator_1 = require("class-validator");
function IsStringQueryObjectNumberRange(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isStringQueryObjectNumberRange',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: Object.assign(Object.assign({}, validationOptions), { message: `${propertyName} should be object and not empty` }),
            validator: {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                validate(value, args) {
                    if (!value) {
                        return true;
                    }
                    try {
                        const parsedObject = JSON.parse(value);
                        if (!(0, class_validator_1.isObject)(parsedObject)) {
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
                    }
                    catch (e) {
                        return false;
                    }
                },
            },
        });
    };
}
exports.IsStringQueryObjectNumberRange = IsStringQueryObjectNumberRange;
function IsStringQueryObjectSortOrder(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsStringQueryObjectSortOrder',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: Object.assign(Object.assign({}, validationOptions), { message: `${propertyName} should be object and not empty with valid sort order` }),
            validator: {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                validate(value, args) {
                    if (!value) {
                        return true;
                    }
                    try {
                        const parsedObject = JSON.parse(value);
                        if (!(0, class_validator_1.isObject)(parsedObject)) {
                            return false;
                        }
                        for (const key in parsedObject) {
                            const isValidSortOrder = parsedObject[key] === 1 || parsedObject[key] === -1;
                            if (!isValidSortOrder) {
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
exports.IsStringQueryObjectSortOrder = IsStringQueryObjectSortOrder;
//# sourceMappingURL=is.string.object.decorator.js.map