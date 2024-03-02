import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { SubscriptionValidation } from "../subscription.validation";
import { SubscriptionService } from "../subscription.service";
import auth from "@/lib/authMiddleware";
import { ENUM } from "@/constants/common";

export const POST = withErrorHandler(async (request: NextRequest) => {
  await auth([ENUM.MEMBER], request);
  const user = (request as any).user
  const body = await request.json();
  await SubscriptionValidation.SubscriptionSchema.parseAsync({
    body,
  });
  const { subscriptionFee, ...userData } = body;
  const result = await SubscriptionService.create(subscriptionFee, userData, user);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subscription Extended Created Successfully!",
    data: result,
  };

  return sendResponse(data);
});
