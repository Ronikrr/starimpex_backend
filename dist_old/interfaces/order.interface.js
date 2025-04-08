"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EOrderItemStatus = exports.EOrderStatus = void 0;
var EOrderStatus;
(function (EOrderStatus) {
    EOrderStatus["PENDING"] = "pending";
    EOrderStatus["CONFIRM"] = "confirm";
    EOrderStatus["PARTIALLY_CONFIRM"] = "partially_confirm";
    EOrderStatus["CANCELED"] = "canceled";
})(EOrderStatus = exports.EOrderStatus || (exports.EOrderStatus = {}));
var EOrderItemStatus;
(function (EOrderItemStatus) {
    EOrderItemStatus["PENDING"] = "pending";
    EOrderItemStatus["CONFIRM"] = "confirm";
    EOrderItemStatus["NOT_CONFIRM"] = "not_confirm";
})(EOrderItemStatus = exports.EOrderItemStatus || (exports.EOrderItemStatus = {}));
//# sourceMappingURL=order.interface.js.map