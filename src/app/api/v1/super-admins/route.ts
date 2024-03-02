import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { getQueryParams } from "@/utils/getQueryParams";
import pick from "@/utils/pick";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { superAdminFilterableFields } from "./superAdmin.constants";
import { SuperAdminService } from "./superAdmin.service";

export const GET = withErrorHandler(
  async (request: NextRequest, context: any) => {
    const queryParams = getQueryParams(request);

    const filters = pick(queryParams, superAdminFilterableFields);
    const options = pick(queryParams, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await SuperAdminService.getAll(filters, options);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Super Admins Fetched Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
);
