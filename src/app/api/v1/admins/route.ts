import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { getQueryParams } from "@/utils/getQueryParams";
import pick from "@/utils/pick";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { adminFilterableFields } from "./admins.constants";
import { AdminService } from "./admins.service";
import auth from "@/lib/authMiddleware";
import { ENUMUSER } from "@/constants/common";

export const GET = withErrorHandler(
  async (request: NextRequest, context: any) => {
    const queryParams = getQueryParams(request);
    await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.ADMIN], request);
    const user = (request as any).user
    const filters = pick(queryParams, adminFilterableFields);
    const options = pick(queryParams, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AdminService.getAll(filters, options, user);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Admins Fetched Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
);