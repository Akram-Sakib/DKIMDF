import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { AuthService } from "../auth.service";
import { AuthValidation } from "../auth.validation";
import { ILoginUserResponse } from "../auth.interface";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();
  await AuthValidation.loginZodSchema.parseAsync({
    body,
  });
  const result = await AuthService.loginUser(body);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged In Successfully!",
    data: result,
  };

  return sendResponse<ILoginUserResponse>(data);
});
