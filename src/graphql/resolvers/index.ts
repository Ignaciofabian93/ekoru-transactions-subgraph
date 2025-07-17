import { TransactionResolver } from "./transactions";

export const resolvers = {
  Query: {
    ...TransactionResolver.Query,
  },
  Mutation: {
    ...TransactionResolver.Mutation,
  },
  Transaction: TransactionResolver.Transaction,
  ExchangeDetails: TransactionResolver.ExchangeDetails,
  User: {
    ...TransactionResolver.User,
  },
  Product: {
    ...TransactionResolver.Product,
  },
};
