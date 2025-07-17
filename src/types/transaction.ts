import { type TransactionKind, type ExchangeStatus } from "./enums";

export type Transaction = {
  id: number;
  kind: TransactionKind;
  pointsCollected: number;
  createdAt: string;
  userId: string;
};

export type Exchange = {
  id: number;
  transactionId: number;
  offeredProductId: number;
  requestedProductId: number;
  status: ExchangeStatus;
  notes?: string;
  createdAt: string;
  completedAt?: string;
};

export type CreateExchangeInput = {
  offeredProductId: number;
  requestedProductId: number;
  notes?: string;
};

export type UpdateExchangeStatusInput = {
  exchangeId: number;
  status: ExchangeStatus;
};
