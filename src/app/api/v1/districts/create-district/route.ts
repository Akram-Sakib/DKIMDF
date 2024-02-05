import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { DistrictService } from "../districts.service";
import { DistrictValidation } from "../districts.validation";

export const POST = withErrorHandler(
  async (request: NextRequest) => {
    const body = await request.json();
    await DistrictValidation.DistrictSchema.parseAsync({
      body,
    });
    const result = await DistrictService.create(body);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "New District Created Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
);
