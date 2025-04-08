"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateManualOrderDto = exports.OrderItemDto = exports.OrderAdditionChargesDto = exports.ChangeOrderStatusDto = exports.PartialOrderItemStatus = void 0;
const tslib_1 = require("tslib");
const order_interface_1 = require("../../interfaces/order.interface");
const regex_1 = require("../../utils/regex");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PartialOrderItemStatus {
}
tslib_1.__decorate([
    (0, class_validator_1.Matches)(regex_1.ID_REGEX),
    tslib_1.__metadata("design:type", String)
], PartialOrderItemStatus.prototype, "itemId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], PartialOrderItemStatus.prototype, "isConfirmed", void 0);
exports.PartialOrderItemStatus = PartialOrderItemStatus;
class ChangeOrderStatusDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(order_interface_1.EOrderStatus),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ChangeOrderStatusDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PartialOrderItemStatus),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateIf)(o => o.status === order_interface_1.EOrderStatus.PARTIALLY_CONFIRM),
    tslib_1.__metadata("design:type", Array)
], ChangeOrderStatusDto.prototype, "items", void 0);
exports.ChangeOrderStatusDto = ChangeOrderStatusDto;
class OtherChargeDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], OtherChargeDto.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], OtherChargeDto.prototype, "description", void 0);
class OrderAdditionChargesDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], OrderAdditionChargesDto.prototype, "shippingCharge", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OtherChargeDto),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], OrderAdditionChargesDto.prototype, "additionalCharges", void 0);
exports.OrderAdditionChargesDto = OrderAdditionChargesDto;
class OrderItemDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], OrderItemDto.prototype, "stoneNo", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], OrderItemDto.prototype, "lab", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], OrderItemDto.prototype, "shape", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], OrderItemDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], OrderItemDto.prototype, "rap", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], OrderItemDto.prototype, "ourDiscount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], OrderItemDto.prototype, "pricePerCarat", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], OrderItemDto.prototype, "ourPrice", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], OrderItemDto.prototype, "caratWeight", void 0);
exports.OrderItemDto = OrderItemDto;
class CreateManualOrderDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", Date)
], CreateManualOrderDto.prototype, "orderDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateManualOrderDto.prototype, "companyName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateManualOrderDto.prototype, "companyEmail", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateManualOrderDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemDto),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], CreateManualOrderDto.prototype, "orderItems", void 0);
exports.CreateManualOrderDto = CreateManualOrderDto;
//# sourceMappingURL=order.dto.js.map