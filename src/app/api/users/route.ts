import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";

export const GET = withErrorHandler(async () => {

  const result = {
    name: "John Doe",
    email: "john@gmail.com ",
  };

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "All users created successfully!",
    data: result,
  };

  return sendResponse(data);
});
