import { GraphQLError } from "graphql";

class NotFoundError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: "NOT_FOUND",
      },
    });
  }
}

class UnAuthorizedError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: "UNAUTHORIZED",
      },
    });
  }
}

class BadRequestError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: "BAD_REQUEST",
      },
    });
  }
}

class InternalServerError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
}

class UserError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: "USER_ERROR",
      },
    });
  }
}

export const ErrorService = {
  NotFoundError,
  UnAuthorizedError,
  BadRequestError,
  InternalServerError,
  UserError,
};
