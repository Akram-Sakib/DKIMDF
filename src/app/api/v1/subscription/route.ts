import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { getQueryParams } from "@/utils/getQueryParams";
import pick from "@/utils/pick";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { subscriptionFilterableFields } from "./subscription.constants";
import { SubscriptionService } from "./subscription.service";
import auth from "@/lib/authMiddleware";
import { ENUMUSER } from "@/constants/common";

export const GET = withErrorHandler(
  async (request: NextRequest, context: any) => {
    const queryParams = getQueryParams(request);
    await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.ADMIN, ENUMUSER.MEMBER], request);
    const user = (request as any).user
    const filters = pick(queryParams, subscriptionFilterableFields);
    const options = pick(queryParams, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await SubscriptionService.getAll(filters, options, user);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Subscriptions Fetched Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
);
