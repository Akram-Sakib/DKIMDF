import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { PostOffice } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { PostOfficeService } from "../postoffices.service";
import { PostOfficeValidation } from "../postoffices.validation";
import auth from "@/lib/authMiddleware";
import { ENUMUSER } from "@/constants/common";

export const GET = withErrorHandler(async (request, context) => {
  await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.ADMIN], request);
  const { id } = context.params;
  const result = await PostOfficeService.getById(id);
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post Office Fetched Successfully!",
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
    await PostOfficeValidation.PostOfficeUpdateSchema.parseAsync({
      body,
    });
    const result = await PostOfficeService.updateById(id, body);

    return sendResponse<PostOffice>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Post Office Updated Successfully!",
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
    const result = await PostOfficeService.deleteById(id);

    return sendResponse<PostOffice>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Post Office Deleted Successfully!",
      data: result,
    });
  }
);
