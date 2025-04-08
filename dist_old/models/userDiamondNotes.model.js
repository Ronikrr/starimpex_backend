"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDiamondNotesModel = exports.UserDiamondNotes = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const users_model_1 = require("./users.model");
let UserDiamondNotes = class UserDiamondNotes {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ ref: users_model_1.User, required: true }),
    tslib_1.__metadata("design:type", Object)
], UserDiamondNotes.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], UserDiamondNotes.prototype, "uniqueStoneId", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], UserDiamondNotes.prototype, "notes", void 0);
UserDiamondNotes = tslib_1.__decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'userDiamondNotes', timestamps: true } })
], UserDiamondNotes);
exports.UserDiamondNotes = UserDiamondNotes;
exports.UserDiamondNotesModel = (0, typegoose_1.getModelForClass)(UserDiamondNotes);
//# sourceMappingURL=userDiamondNotes.model.js.map