import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { Village } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { VillageService } from "../villages.service";
import { VillageValidation } from "../villages.validation";
import auth from "@/lib/authMiddleware";
import { ENUMUSER } from "@/constants/common";

export const GET = withErrorHandler(async (request, context) => {
  await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.ADMIN], request);
  const { id } = context.params;
  const result = await VillageService.getById(id);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Village Fetched Successfully!",
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
    await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.ADMIN], req);
    await VillageValidation.VillageUpdateSchema.parseAsync({
      body,
    });
    const result = await VillageService.updateById(id, body);

    return sendResponse<Village>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Village Updated Successfully!",
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
    const result = await VillageService.deleteById(id);

    return sendResponse<Village>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Village Deleted Successfully!",
      data: result,
    });
  }
);
