import { IGenericErrorMessage } from "@/types/error";
import { Prisma } from "@prisma/client";

const handleInitializationError = (
  error: Prisma.PrismaClientInitializationError
) => {
  let errors: IGenericErrorMessage[] = [];
  let message = "";
  const statusCode = 400;
  console.log("InitializationError", error);

    if (error.errorCode === 'P1000') {
      message = (error.message as string) || "Record not found!"
      errors = [
        {
          path: "",
          message
        }
      ]
    }
    else if (error.errorCode === 'P2003') {
      if (error.message.includes('delete()` invocation:')) {
        message = "Delete failed"
        errors = [
          {
            path: "",
            message
          }
        ]
      }
    }

    return {
      statusCode,
      message,
      errorMessages: errors,
    };
};

export default handleInitializationError;
