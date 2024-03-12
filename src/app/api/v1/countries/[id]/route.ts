import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { Country } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { CountryService } from "../countries.service";
import { CountryValidation } from "../countries.validation";
import auth from "@/lib/authMiddleware";
import { ENUMUSER } from "@/constants/common";

export const GET = withErrorHandler(async (request, context) => {
  await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.ADMIN], request);
  const { id } = context.params;
  const result = await CountryService.getById(id);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Country Fetched Successfully!",
    data: result,
  };

  return sendResponse(data);
});

export const PATCH = withErrorHandler(
  async (
    req: NextRequest,
    {
      params,
    }: {
      params: { id: string };
    }
  ) => {

    await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.ADMIN], req);
    const { id } = params;
    const body = await req.json();
    await CountryValidation.CountryUpdateSchema.parseAsync({
      body,
    });
    const result = await CountryService.updateById(id, body);

    return sendResponse<Country>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Country Updated Successfully!",
      data: result,
    });
  }
);

export const DELETE = withErrorHandler(
  async (
    req: NextRequest,
    {
      params,
    }: {
      params: { id: string };
    }
  ) => {

    await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.ADMIN], req);
    const { id } = params;
    const result = await CountryService.deleteById(id);

    return sendResponse<Country>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Country Deleted Successfully!",
      data: result,
    });
  }
);
