import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { SubscriptionValidation } from "../subscription.validation";
import { SubscriptionService } from "../subscription.service";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();
  await SubscriptionValidation.SubscriptionSchema.parseAsync({
    body,
  });
  const { subscriptionFee, ...userData } = body;
  const result = await SubscriptionService.create(subscriptionFee, userData);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "New Subscription Created Successfully!",
    data: result,
  };

  return sendResponse(data);
});
