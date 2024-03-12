import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { Division } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { DivisionService } from "../divisions.service";
import { DivisionValidation } from "../divisions.validation";
import auth from "@/lib/authMiddleware";
import { ENUMUSER } from "@/constants/common";

export const GET = withErrorHandler(async (request, context) => {
  await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.ADMIN], request);
  const { id } = context.params;
  const result = await DivisionService.getById(id);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Division Fetched Successfully!",
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
    await DivisionValidation.DivisionUpdateSchema.parseAsync({
      body,
    });
    const result = await DivisionService.updateById(id, body);

    return sendResponse<Division>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Division Updated Successfully!",
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
    const result = await DivisionService.deleteById(id);

    return sendResponse<Division>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Division Deleted Successfully!",
      data: result,
    });
  }
);
