import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { CountryService } from "../countries.service";
import { CountryValidation } from "../countries.validation";
import auth from "@/lib/authMiddleware";
import { ENUM } from "@/constants/common";

export const POST = withErrorHandler(
  async (request: NextRequest) => {

    await auth([ENUM.GRAND_ADMIN, ENUM.SUPER_ADMIN, ENUM.ADMIN], request);
    const body = await request.json();
    const user = (request as any).user

    await CountryValidation.CountrySchema.parseAsync({
      body,
    });
    const result = await CountryService.create(body,
      user);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "New Country Created Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
);
