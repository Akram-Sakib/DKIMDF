import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { ThanaValidation } from "../thana.validation";
import { ThanaService } from "../thana.service";

export const POST = withErrorHandler(
  async (request: NextRequest) => {
    const body = await request.json();
    await ThanaValidation.ThanaSchema.parseAsync({
      body,
    });
    const result = await ThanaService.create(body);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "New Thana Created Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
);
