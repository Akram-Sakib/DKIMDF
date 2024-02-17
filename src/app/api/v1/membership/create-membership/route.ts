import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { MembershipValidation } from "../membership.validation";
import { MembershipService } from "../membership.service";
import { ENUM } from "@/constants/common";
import auth from "@/lib/authMiddleware";

export const POST = withErrorHandler(async (request: NextRequest) => {

  const body = await request.json();

  await auth([ENUM.GRAND_ADMIN, ENUM.SUPER_ADMIN, ENUM.ADMIN], request);
  const user = (request as any).user
  await MembershipValidation.MembershipSchema.parseAsync({
    body,
  });
  const { membershipFee, ...userData } = body;
  const result = await MembershipService.create(membershipFee, userData, user);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "New Membership Created Successfully!",
    data: result,
  };

  return sendResponse(data);
});
