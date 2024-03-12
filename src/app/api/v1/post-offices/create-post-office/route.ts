import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { PostOfficeService } from "../postOffices.service";
import { PostOfficeValidation } from "../postOffices.validation";
import auth from "@/lib/authMiddleware";
import { ENUMUSER } from "@/constants/common";

export const POST = withErrorHandler(
  async (request: NextRequest) => {
    await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.ADMIN], request);
    const user = (request as any).user
    const body = await request.json();
    await PostOfficeValidation.PostOfficeSchema.parseAsync({
      body,
    });
    const result = await PostOfficeService.create(body,user);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "New Post Office Created Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
);
