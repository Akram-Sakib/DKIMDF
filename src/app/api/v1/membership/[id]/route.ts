import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { Membership } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { MembershipService } from "../membership.service";
import { MembershipValidation } from "../membership.validation";
import auth from "@/lib/authMiddleware";
import { ENUMUSER } from "@/constants/common";

export const GET = withErrorHandler(async (request, context) => {

  await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.MEMBER], request);
  const { id } = context.params;

  const result = await MembershipService.getById(id);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Membership Fetched Successfully!",
    data: result,
  };

  return sendResponse(data);
});

export const PATCH = withErrorHandler(
  async (
    req: NextRequest,
    {
      params,
    }: {
      params: { id: string };
    }
  ) => {

    await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.ADMIN], req);
    const { id } = params;
    const body = await req.json();
    await MembershipValidation.MembershipUpdateSchema.parseAsync({
      body,
    });
    const { membershipFee, ...restProps } = body;
    const result = await MembershipService.updateById(
      id,
      membershipFee,
      restProps
    );

    return sendResponse<Membership>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Membership Updated Successfully!",
      data: result,
    });
  }
);

export const DELETE = withErrorHandler(
  async (
    req: NextRequest,
    {
      params,
    }: {
      params: { id: string };
    }
  ) => {

    await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.ADMIN], req);
    const { id } = params;
    const result = await MembershipService.deleteById(id);

    return sendResponse<Membership>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Membership Deleted Successfully!",
      data: result,
    });
  }
);
