import { type ShippingStage } from "./enums";

export type Order = {
  id: number;
  userId: string;
  createdAt: string;
  shippingStatusId: number;
};

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
};

export type ShippingStatus = {
  id: number;
  status: ShippingStage;
};
