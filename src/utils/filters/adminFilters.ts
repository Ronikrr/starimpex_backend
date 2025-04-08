import { DiamondSource } from '@/models/diamondSources.model';
import { Order } from '@/models/order.model';
import { Purchase } from '@/models/purchase.model';
import { User } from '@/models/users.model';

export const filterUserProjection = {
  _id: 1,
  fullName: 1,
  firstName: 1,
  lastName: 1,
  companyName: 1,
  address: 1,
  state: 1,
  city: 1,
  country: 1,
  mobileNumber: 1,
  telephoneNumber: 1,
  email: 1,
  messengerType: 1,
  messengerIdNumber: 1,
  website: 1,
  notes: 1,
  status: 1,
  createdAt: 1,
  updatedAt: 1,
};

export const filterUserBasicDetailsProjection = {
  _id: 1,
  fullName: 1,
  firstName: 1,
  lastName: 1,
  companyName: 1,
  email: 1,
  mobileNumber: 1,
};

export const filterUser = (user: User) => {
  return {
    _id: user._id,
    fullName: user.fullName,
    firstName: user.firstName,
    lastName: user.lastName,
    companyName: user.companyName,
    address: user.address,
    state: user.state,
    city: user.city,
    country: user.country,
    mobileNumber: user.mobileNumber,
    telephoneNumber: user.telephoneNumber,
    email: user.email,
    messengerType: user.messengerType,
    messengerIdNumber: user.messengerIdNumber,
    website: user.website,
    notes: user.notes,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const filterDiamondSourceProjection = {
  sourceType: 1,
  isDisabled: 1,
  markupPercentage: 1,
};

export const filterDiamondSource = (diamondSource: DiamondSource) => {
  return {
    sourceType: diamondSource.sourceType,
    isDisabled: diamondSource.isDisabled,
    markupPercentage: diamondSource.markupPercentage,
  };
};

export const filterOrder = (order: Order) => {
  return {
    _id: order._id,
    orderNumber: order.orderNumber,
    items: order.items,
    remarks: order.remarks,
    user: order.user,
    status: order.status,
    shippingCharge: order.shippingCharge,
    additionalCharges: order.additionalCharges,
    grossAmount: order.grossAmount,
    totalStones: order.totalStones,
    totalCarats: order.totalCarats,
    isTermsAccepted: order.isTermsAccepted,
    createdAt: order.createdAt,
    isManualOrder: order.isManualOrder,
    companyEmail: order.companyEmail,
    companyName: order.companyName,
    description: order.description,
  };
};

export const filterUserCartHistoryProjection = {
  stoneNos: 1,
  user: 1,
  createdAt: 1,
};

export const filterUserPriceTrackHistoryProjection = {
  stoneNos: 1,
  user: 1,
  createdAt: 1,
};

export const filterPurchaseProjection = {
  _id: 1,
  orderId: 1,
  date: 1,
  supplierName: 1,
  supplierAddress: 1,
  description: 1,
  items: 1,
};

export const filterPurchase = (purchase: Purchase) => {
  return {
    _id: purchase._id,
    orderId: purchase.orderId,
    date: purchase.date,
    supplierName: purchase.supplierName,
    supplierAddress: purchase.supplierAddress,
    description: purchase.description,
    items: purchase.items,
  };
};
