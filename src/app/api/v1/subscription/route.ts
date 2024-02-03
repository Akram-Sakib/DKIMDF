import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { getQueryParams } from "@/utils/getQueryParams";
import pick from "@/utils/pick";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { subscriptionFilterableFields } from "./subscription.contants";
import { SubscriptionService } from "./subscription.service";

export const GET = withErrorHandler(
  async (request: NextRequest, context: any) => {
    const queryParams = getQueryParams(request);

    const filters = pick(queryParams, subscriptionFilterableFields);
    const options = pick(queryParams, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await SubscriptionService.getAll(filters, options);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Subscription Fetched Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
);
