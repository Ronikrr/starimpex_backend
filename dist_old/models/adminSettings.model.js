"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSettingsModel = exports.AdminSettings = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
let AdminSettings = class AdminSettings {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", Array)
], AdminSettings.prototype, "fcmTokens", void 0);
AdminSettings = tslib_1.__decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'adminSettings', timestamps: true } })
], AdminSettings);
exports.AdminSettings = AdminSettings;
exports.AdminSettingsModel = (0, typegoose_1.getModelForClass)(AdminSettings);
//# sourceMappingURL=adminSettings.model.js.map