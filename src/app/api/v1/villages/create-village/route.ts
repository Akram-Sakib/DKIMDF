import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { VillageService } from "../villages.service";
import { VillageValidation } from "../villages.validation";

export const POST = withErrorHandler(
  async (request: NextRequest) => {
    const body = await request.json();
    await VillageValidation.VillageSchema.parseAsync({
      body,
    });
    const result = await VillageService.create(body);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "New Village Created Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
);
