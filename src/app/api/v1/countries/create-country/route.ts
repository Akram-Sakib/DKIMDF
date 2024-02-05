import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { CountryService } from "../countries.service";
import { CountryValidation } from "../countries.validation";

export const POST = withErrorHandler(
  async (request: NextRequest) => {
    const body = await request.json();
    await CountryValidation.CountrySchema.parseAsync({
      body,
    });
    const result = await CountryService.create(body);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "New Country Created Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
);
