import { ENUMUSER } from "@/constants/common";
import auth from "@/lib/authMiddleware";
import ErrorResponse from "@/lib/error-response";
import sendResponse from "@/lib/sendResponse";
import { Admin } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { AdminService } from "../admins.service";
import { AdminValidation } from "../admins.validation";

export const GET = async (request: NextRequest, context: {
  params: { id: string }
}) => {
  const { id } = context.params;

  try {
    await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN], request);
    const result = await AdminService.getById(id);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Fetched Successfully!",
      data: result,
    };

    return sendResponse(data);
  } catch (error) {
    return ErrorResponse(error)
  }
}

export const PATCH =
  async (
    req: NextRequest,
    {
      params,
    }: {
      params: { id: string };
    }
  ) => {
    const { id } = params;

    try {
      await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN], req);
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
    } catch (error) {
      return ErrorResponse(error)
    }
  }


export const DELETE =
  async (
    req: NextRequest,
    {
      params,
    }: {
      params: { id: string };
    }
  ) => {
    const { id } = params;
    try {
      await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN], req);
      const result = await AdminService.deleteById(id);

      return sendResponse<Admin>({
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin Deleted Successfully!",
        data: result,
      });
    } catch (error) {
      return ErrorResponse(error)
    }
  }

