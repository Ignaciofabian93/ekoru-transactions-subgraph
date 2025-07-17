import { TransactionService } from "../services/transactions";
import { type Context } from "../../types/context";

export const TransactionResolver = {
  Query: {
    transactions: (_parent: unknown, args: { userId?: string }, context: Context) =>
      TransactionService.getTransactions({ userId: args.userId }),

    transaction: (_parent: unknown, args: { id: string }, context: Context) =>
      TransactionService.getTransaction({ id: parseInt(args.id) }),

    exchanges: (_parent: unknown, args: { userId?: string }, context: Context) =>
      TransactionService.getExchanges({ userId: args.userId }),

    exchange: (_parent: unknown, args: { id: string }, context: Context) =>
      TransactionService.getExchange({ id: parseInt(args.id) }),

    myTransactions: (_parent: unknown, _args: unknown, context: Context) =>
      TransactionService.getMyTransactions(context),

    myExchanges: (_parent: unknown, _args: unknown, context: Context) => TransactionService.getMyExchanges(context),
  },

  Mutation: {
    createExchange: (_parent: unknown, args: { input: any }, context: Context) =>
      TransactionService.createExchange(context, args.input),

    updateExchangeStatus: (_parent: unknown, args: { input: any }, context: Context) =>
      TransactionService.updateExchangeStatus(context, {
        exchangeId: parseInt(args.input.exchangeId),
        status: args.input.status,
      }),

    cancelExchange: (_parent: unknown, args: { exchangeId: string }, context: Context) =>
      TransactionService.cancelExchange(context, parseInt(args.exchangeId)),
  },

  // Field resolvers
  Transaction: {
    user: (parent: any) => parent.user,
    exchangeDetails: (parent: any) => parent.exchange,
  },

  ExchangeDetails: {
    offeredProduct: (parent: any) => parent.offeredProduct,
    requestedProduct: (parent: any) => parent.requestedProduct,
  },

  // Federation resolvers for external entities
  User: {
    __resolveReference: (user: { id: string }) => ({ id: user.id }),
  },

  Product: {
    __resolveReference: (product: { id: string }) => ({ id: product.id }),
  },
};
