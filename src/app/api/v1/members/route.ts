import { ENUMUSER } from "@/constants/common";
import auth from "@/lib/authMiddleware";
import ErrorResponse from "@/lib/error-response";
import sendResponse from "@/lib/sendResponse";
import { getQueryParams } from "@/utils/getQueryParams";
import pick from "@/utils/pick";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { memberFilterableFields } from "./member.constants";
import { MemberService } from "./member.service";

export const GET = async (request: NextRequest, context: any) => {
  const queryParams = getQueryParams(request);

  const filters = pick(queryParams, memberFilterableFields);
  const options = pick(queryParams, ["limit", "page", "sortBy", "sortOrder"]);

  try {
    await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.ADMIN], request);
    const user = (request as any).user
    const result = await MemberService.getAll(filters, options, user);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Members Fetched Successfully!",
      data: result,
    };

    return sendResponse(data);
  } catch (error) {
    return ErrorResponse(error)
  }
}
