import ErrorResponse from "@/lib/error-response";
import sendResponse from "@/lib/sendResponse";
import { getQueryParams } from "@/utils/getQueryParams";
import pick from "@/utils/pick";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { membershipFilterableFields } from "./membership.constants";
import { MembershipService } from "./membership.service";

export const GET = async (request: NextRequest, context: any) => {
  const queryParams = getQueryParams(request);

  const filters = pick(queryParams, membershipFilterableFields);
  const options = pick(queryParams, ["limit", "page", "sortBy", "sortOrder"]);

  try {
    const result = await MembershipService.getAll(filters, options);
    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Memberships Fetched Successfully!",
      data: result,
    };
    return sendResponse(data);
  } catch (error) {
    return ErrorResponse(error)
  }
}
