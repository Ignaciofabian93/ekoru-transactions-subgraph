import gql from "graphql-tag";

export const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable", "@external"])

  enum TransactionKind {
    PURCHASE
    EXCHANGE
    GIFT
    REFERRAL
    BONUS
  }

  type Transaction {
    id: ID!
    kind: TransactionKind!
    pointsCollected: Int!
    createdAt: String!
    userId: String!
    user: User
    exchangeDetails: ExchangeDetails
  }

  type ExchangeDetails {
    id: ID!
    transactionId: Int!
    offeredProductId: Int!
    requestedProductId: Int!
    offeredProduct: Product
    requestedProduct: Product
    status: ExchangeStatus!
    createdAt: String!
    completedAt: String
    notes: String
  }

  enum ExchangeStatus {
    PENDING
    ACCEPTED
    DECLINED
    COMPLETED
    CANCELLED
  }

  extend type User @key(fields: "id") {
    id: ID! @external
  }

  extend type Product @key(fields: "id") {
    id: ID! @external
  }

  input CreateExchangeInput {
    offeredProductId: Int!
    requestedProductId: Int!
    notes: String
  }

  input UpdateExchangeStatusInput {
    exchangeId: ID!
    status: ExchangeStatus!
  }

  extend type Query {
    transactions(userId: String): [Transaction!]!
    transaction(id: ID!): Transaction
    exchanges(userId: String): [ExchangeDetails!]!
    exchange(id: ID!): ExchangeDetails
    myTransactions: [Transaction!]!
    myExchanges: [ExchangeDetails!]!
  }

  extend type Mutation {
    createExchange(input: CreateExchangeInput!): ExchangeDetails!
    updateExchangeStatus(input: UpdateExchangeStatusInput!): ExchangeDetails!
    cancelExchange(exchangeId: ID!): ExchangeDetails!
  }
`;
