import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { Thana } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { ThanaService } from "../thana.service";
import { ThanaValidation } from "../thana.validation";
import { ENUMUSER } from "@/constants/common";
import auth from "@/lib/authMiddleware";

export const GET = withErrorHandler(async (request, context) => {

  await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.ADMIN], request);
  const { id } = context.params;

  const result = await ThanaService.getById(id);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Thana Fetched Successfully!",
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
    await ThanaValidation.ThanaUpdateSchema.parseAsync({
      body,
    });
    const result = await ThanaService.updateById(id, body);

    return sendResponse<Thana>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Thana Updated Successfully!",
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
    const result = await ThanaService.deleteById(id);

    return sendResponse<Thana>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Thana Deleted Successfully!",
      data: result,
    });
  }
);
