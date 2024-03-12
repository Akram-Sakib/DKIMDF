import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { SubscriptionValidation } from "../subscription.validation";
import { SubscriptionService } from "../subscription.service";
import auth from "@/lib/authMiddleware";
import { ENUMUSER } from "@/constants/common";

export const POST = withErrorHandler(async (request: NextRequest) => {
  await auth([ENUMUSER.MEMBER], request);
  const user = (request as any).user
  const body = await request.json();
  await SubscriptionValidation.SubscriptionSchema.parseAsync({
    body,
  });
  const { membershipId } = body;
  const result = await SubscriptionService.create(membershipId, user);
  console.log(result);
  
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your Subscription Has Extended Successfully!",
    data: result,
  };

  return sendResponse(data);
});
