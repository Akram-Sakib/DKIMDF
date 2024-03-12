import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { Admin } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { AdminService } from "../admins.service";
import { AdminValidation } from "../admins.validation";
import auth from "@/lib/authMiddleware";
import { ENUMUSER } from "@/constants/common";

export const GET = withErrorHandler(async (request, context) => {
  await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN], request);
  const { id } = context.params;
  const result = await AdminService.getById(id);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Fetched Successfully!",
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
    await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN], req);
    const { id } = params;
    const body = await req.json();
    await AdminValidation.AdminUpdateSchema.parseAsync({
      body,
    });
    const result = await AdminService.updateById(id, body);

    return sendResponse<Admin>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Updated Successfully!",
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
    await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN], req);
    const { id } = params;
    const result = await AdminService.deleteById(id);

    return sendResponse<Admin>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Deleted Successfully!",
      data: result,
    });
  }
);
