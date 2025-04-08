"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackModel = exports.Feedback = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const users_model_1 = require("./users.model");
let Feedback = class Feedback {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ ref: users_model_1.User }),
    tslib_1.__metadata("design:type", Object)
], Feedback.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Feedback.prototype, "rating", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Feedback.prototype, "comment", void 0);
Feedback = tslib_1.__decorate([
    (0, typegoose_1.index)({ createdA: -1 }),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'feedbacks', timestamps: true } })
], Feedback);
exports.Feedback = Feedback;
exports.FeedbackModel = (0, typegoose_1.getModelForClass)(Feedback);
//# sourceMappingURL=feedback.model.js.map