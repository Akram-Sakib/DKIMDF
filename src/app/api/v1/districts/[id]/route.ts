import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { District } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { DistrictService } from "../districts.service";
import { DistrictValidation } from "../districts.validation";

export const GET = withErrorHandler(async (request, context) => {
  const { id } = context.params;

  const result = await DistrictService.getById(id);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "District Fetched Successfully!",
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
    const { id } = params;
    const body = await req.json();
    await DistrictValidation.DistrictUpdateSchema.parseAsync({
      body,
    });
    const result = await DistrictService.updateById(id, body);

    return sendResponse<District>({
      statusCode: httpStatus.OK,
      success: true,
      message: "District Updated Successfully!",
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
    const { id } = params;
    const result = await DistrictService.deleteById(id);

    return sendResponse<District>({
      statusCode: httpStatus.OK,
      success: true,
      message: "District Deleted Successfully!",
      data: result,
    });
  }
);
