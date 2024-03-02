import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { SuperAdmin } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { SuperAdminService } from "../superAdmin.service";
import { SuperAdminValidation } from "../superAdmin.validation";

export const GET = withErrorHandler(async (request, context) => {
  const { id } = context.params;

  const result = await SuperAdminService.getById(id);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Super Admin Fetched Successfully!",
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
    await SuperAdminValidation.SuperAdminUpdateSchema.parseAsync({
      body,
    });
    const result = await SuperAdminService.updateById(id, body);

    return sendResponse<SuperAdmin>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Super Admin Updated Successfully!",
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
    const result = await SuperAdminService.deleteById(id);

    return sendResponse<SuperAdmin>({
      statusCode: httpStatus.OK,
      success: true,
      message: "SuperAdmin Deleted Successfully!",
      data: result,
    });
  }
);
