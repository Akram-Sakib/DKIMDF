import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { DivisionService } from "../divisions.service";
import { DivisionValidation } from "../divisions.validation";

export const POST = withErrorHandler(
  async (request: NextRequest) => {
    const body = await request.json();
    await DivisionValidation.DivisionSchema.parseAsync({
      body,
    });
    const result = await DivisionService.create(body);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "New Division Created Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
);
