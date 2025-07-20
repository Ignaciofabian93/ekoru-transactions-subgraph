import { TransactionService } from "../services/transactions";

export const TransactionResolver = {
  Query: {
    transactions: (_parent: unknown, args: { userId?: string }) =>
      TransactionService.getTransactions({ userId: args.userId }),

    transaction: (_parent: unknown, args: { id: string }) =>
      TransactionService.getTransaction({ id: parseInt(args.id) }),

    exchanges: (_parent: unknown, args: { userId?: string }) =>
      TransactionService.getExchanges({ userId: args.userId }),

    exchange: (_parent: unknown, args: { id: string }) => TransactionService.getExchange({ id: parseInt(args.id) }),

    myTransactions: (_parent: unknown, _args: { userId: string }) => TransactionService.getMyTransactions(_args),

    myExchanges: (_parent: unknown, _args: { userId: string }) => TransactionService.getMyExchanges(_args),
  },

  Mutation: {
    createExchange: (_parent: unknown, args: { userId: string; input: any }) =>
      TransactionService.createExchange({ userId: args.userId }, args.input),

    updateExchangeStatus: (_parent: unknown, args: { userId: string; input: any }) =>
      TransactionService.updateExchangeStatus(
        { userId: args.userId },
        {
          exchangeId: parseInt(args.input.exchangeId),
          status: args.input.status,
        },
      ),

    cancelExchange: (_parent: unknown, args: { exchangeId: string; userId: string }) =>
      TransactionService.cancelExchange({ userId: args.userId }, parseInt(args.exchangeId)),
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
