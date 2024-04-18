import config from "@/config";
import ApiError from "@/errors/ApiError";
import handleClientError from "@/errors/handleClientError";
import handleInitializationError from "@/errors/handleInitializationError";
import handleValidationError from "@/errors/handleValidationError";
import handleZodError from "@/errors/handleZodError";
import { IGenericErrorMessage } from "@/types/error";
import { Prisma } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";

function withErrorHandler(
  fn: (request: NextRequest, ...args: any[]) => any,
  zodvalidator?: (request: NextRequest, ...args: any[]) => any
) {
  return async function (request: NextRequest, ...args: any[]) {
    try {
      return await fn(request, ...args);
    } catch (error) {
      let statusCode = 500;
      let message = "Something went wrong !";
      let errorMessages: IGenericErrorMessage[] = [];
      // Log the error to a logging system
      console.log({ error, requestBody: request, location: fn.name });
      // Respond with a generic 500 Internal Server Error
      if (error instanceof Prisma.PrismaClientValidationError) {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
      } else if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
      } else if (error instanceof Prisma.PrismaClientInitializationError) {
        const simplifiedError = handleInitializationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const simplifiedError = handleClientError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
      } else if (error instanceof ApiError) {
        statusCode = error?.statusCode;
        message = error.message;
        errorMessages = error?.message
          ? [
              {
                path: "",
                message: error?.message,
              },
            ]
          : [];
      } else if (error instanceof Error) {
        message = error?.message;
        errorMessages = error?.message
          ? [
              {
                path: "",
                message: error?.message,
              },
            ]
          : [];
      }

      return NextResponse.json(
        {
          success: false,
          message,
          errorMessages,
          stack: config.env !== "production" ? (error as Error)?.stack : undefined,
        },
        { status: statusCode }
      );
    }
  };
}

export default withErrorHandler;
