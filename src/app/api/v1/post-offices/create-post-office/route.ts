import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { PostOfficeService } from "../postOffices.service";
import { PostOfficeValidation } from "../postOffices.validation";

export const POST = withErrorHandler(
  async (request: NextRequest) => {
    const body = await request.json();
    await PostOfficeValidation.PostOfficeSchema.parseAsync({
      body,
    });
    const result = await PostOfficeService.create(body);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "New Post Office Created Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
);
