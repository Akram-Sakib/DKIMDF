import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { IRefreshTokenResponse } from "../auth.interface";
import { AuthService } from "../auth.service";

export const POST = withErrorHandler(async (request: NextRequest) => {
  // @ts-ignore
  const token = request.headers.authorization;
  //   await AuthValidation.loginZodSchema.parseAsync({
  //     body,
  //   });

  const result = await AuthService.refreshToken(token);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged In Successfully!",
    data: result,
  };

  return sendResponse<IRefreshTokenResponse>(data);
});
