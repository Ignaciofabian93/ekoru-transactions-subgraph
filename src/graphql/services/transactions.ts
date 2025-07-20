import { type CreateExchangeInput, type UpdateExchangeStatusInput } from "../../types/transaction";
import { ErrorService } from "../../errors/errors";
import prisma from "../../client/prisma";

export const TransactionService = {
  async getTransactions({ userId }: { userId?: string }) {
    try {
      if (!userId) {
        throw new ErrorService.BadRequestError("No se ha proporcionado un id de usuario");
      }
      const transactions = await prisma.transaction.findMany({
        where: { userId },
        include: {
          user: true,
          exchange: {
            include: {
              offeredProduct: true,
              requestedProduct: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!transactions) {
        throw new ErrorService.NotFoundError("No se encontraron transacciones");
      }

      return transactions;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw new ErrorService.InternalServerError("Error al intentar obtener las transacciones");
    }
  },

  async getTransaction({ id }: { id: number }) {
    try {
      if (!id) {
        throw new ErrorService.BadRequestError("No se ha proporcionado un id de transacción");
      }

      const transaction = await prisma.transaction.findUnique({
        where: { id },
        include: {
          user: true,
          exchange: {
            include: {
              offeredProduct: true,
              requestedProduct: true,
            },
          },
        },
      });

      if (!transaction) {
        throw new ErrorService.NotFoundError("No se encontró la transacción");
      }

      return transaction;
    } catch (error) {
      console.error("Error fetching transaction:", error);
      throw new ErrorService.InternalServerError("Error al intentar obtener la transacción");
    }
  },

  async getExchanges({ userId }: { userId?: string }) {
    try {
      if (!userId) {
        throw new ErrorService.BadRequestError("No se ha proporcionado un id de usuario");
      }

      const exchanges = await prisma.exchange.findMany({
        where: {
          OR: [{ offeredProduct: { userId } }, { requestedProduct: { userId } }],
        },
        include: {
          offeredProduct: true,
          requestedProduct: true,
          transaction: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!exchanges) {
        throw new ErrorService.NotFoundError("No se encontraron intercambios");
      }

      return exchanges;
    } catch (error) {
      console.error("Error fetching exchanges:", error);
      throw new ErrorService.InternalServerError("Error al intentar obtener los intercambios");
    }
  },

  async getExchange({ id }: { id: number }) {
    try {
      if (!id) {
        throw new ErrorService.BadRequestError("No se ha proporcionado un id de intercambio");
      }

      const exchange = await prisma.exchange.findUnique({
        where: { id },
        include: {
          offeredProduct: true,
          requestedProduct: true,
          transaction: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!exchange) {
        throw new ErrorService.NotFoundError("No se encontró el intercambio");
      }

      return exchange;
    } catch (error) {
      console.error("Error fetching exchange:", error);
      throw new ErrorService.InternalServerError("Error al intentar obtener el intercambio");
    }
  },

  async getMyTransactions({ userId }: { userId: string }) {
    try {
      const transactions = await prisma.transaction.findMany({
        where: { userId },
        include: {
          user: true,
          exchange: {
            include: {
              offeredProduct: true,
              requestedProduct: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!transactions) {
        throw new ErrorService.NotFoundError("No se encontraron transacciones");
      }

      return transactions;
    } catch (error) {
      console.error("Error fetching user transactions:", error);
      throw new ErrorService.InternalServerError("Error al intentar obtener las transacciones del usuario");
    }
  },

  async getMyExchanges({ userId }: { userId: string }) {
    try {
      const exchanges = await prisma.exchange.findMany({
        where: {
          OR: [{ offeredProduct: { userId } }, { requestedProduct: { userId } }],
        },
        include: {
          offeredProduct: true,
          requestedProduct: true,
          transaction: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!exchanges) {
        throw new ErrorService.NotFoundError("No se encontraron intercambios");
      }

      return exchanges;
    } catch (error) {
      console.error("Error fetching user exchanges:", error);
      throw new ErrorService.InternalServerError("Error al intentar obtener los intercambios del usuario");
    }
  },

  async createExchange({ userId }: { userId: string }, input: CreateExchangeInput) {
    try {
      const offeredProduct = await prisma.product.findUnique({
        where: { id: input.offeredProductId },
      });

      if (!offeredProduct) {
        throw new ErrorService.NotFoundError("Producto ofrecido no encontrado");
      }

      if (offeredProduct.userId !== userId) {
        throw new ErrorService.UnAuthorizedError("Solo puedes ofrecer tus propios productos");
      }

      const requestedProduct = await prisma.product.findUnique({
        where: { id: input.requestedProductId },
      });

      if (!requestedProduct) {
        throw new ErrorService.NotFoundError("Producto solicitado no encontrado");
      }

      if (!requestedProduct.isExchangeable) {
        throw new ErrorService.BadRequestError("El producto solicitado no está disponible para intercambio");
      }

      if (requestedProduct.userId === userId) {
        throw new ErrorService.BadRequestError("No puedes intercambiar con tu propio producto");
      }

      return await prisma.$transaction(async (tx) => {
        const transaction = await tx.transaction.create({
          data: {
            kind: "EXCHANGE",
            pointsCollected: 50,
            userId,
          },
        });

        const exchange = await tx.exchange.create({
          data: {
            transactionId: transaction.id,
            offeredProductId: input.offeredProductId,
            requestedProductId: input.requestedProductId,
            notes: input.notes,
            status: "PENDING",
          },
          include: {
            offeredProduct: true,
            requestedProduct: true,
            transaction: true,
          },
        });

        return exchange;
      });
    } catch (error) {
      console.error("Error creating exchange:", error);
      if (
        error instanceof ErrorService.UnAuthorizedError ||
        error instanceof ErrorService.NotFoundError ||
        error instanceof ErrorService.BadRequestError
      ) {
        throw error;
      }
      throw new ErrorService.InternalServerError("Error al crear el intercambio");
    }
  },

  async updateExchangeStatus({ userId }: { userId: string }, input: UpdateExchangeStatusInput) {
    try {
      const exchange = await prisma.exchange.findUnique({
        where: { id: input.exchangeId },
        include: {
          requestedProduct: true,
          offeredProduct: true,
          transaction: true,
        },
      });

      if (!exchange) {
        throw new ErrorService.NotFoundError("Intercambio no encontrado");
      }

      // Solo el dueño del producto solicitado puede aceptar/rechazar
      if (exchange.requestedProduct.userId !== userId && input.status !== "CANCELLED") {
        throw new ErrorService.UnAuthorizedError(
          "Solo el dueño del producto puede actualizar el estado del intercambio",
        );
      }

      // Solo el iniciador del intercambio puede cancelar
      if (input.status === "CANCELLED" && exchange.transaction.userId !== userId) {
        throw new ErrorService.UnAuthorizedError("Solo el iniciador del intercambio puede cancelar");
      }

      const updateData: any = {
        status: input.status,
      };

      if (input.status === "COMPLETED") {
        updateData.completedAt = new Date();
      }

      return await prisma.exchange.update({
        where: { id: input.exchangeId },
        data: updateData,
        include: {
          offeredProduct: true,
          requestedProduct: true,
          transaction: true,
        },
      });
    } catch (error) {
      console.error("Error updating exchange status:", error);
      if (error instanceof ErrorService.UnAuthorizedError || error instanceof ErrorService.NotFoundError) {
        throw error;
      }
      throw new ErrorService.InternalServerError("Error al actualizar el estado del intercambio");
    }
  },

  async cancelExchange({ userId }: { userId: string }, exchangeId: number) {
    return await this.updateExchangeStatus(
      { userId },
      {
        exchangeId,
        status: "CANCELLED",
      },
    );
  },
};
