import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { MembershipValidation } from "../membership.validation";
import { MembershipService } from "../membership.service";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();
  await MembershipValidation.MembershipSchema.parseAsync({
    body,
  });
  const { membershipFee, ...userData } = body;
  const result = await MembershipService.create(membershipFee, userData);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "New Membership Created Successfully!",
    data: result,
  };

  return sendResponse(data);
});
