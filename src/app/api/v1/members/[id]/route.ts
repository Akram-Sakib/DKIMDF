import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { Member } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { MemberService } from "../member.service";
import { MemberValidation } from "../member.validation";

export const GET = withErrorHandler(async (request, context) => {
  const { id } = context.params;

  const result = await MemberService.getById(id);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member Fetched Successfully!",
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
    const { id } = params;
    const body = await req.json();
    await MemberValidation.MemberUpdateSchema.parseAsync({
      body,
    });
    const result = await MemberService.updateById(id, body);

    return sendResponse<Member>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Member Updated Successfully!",
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
    const { id } = params;
    const result = await MemberService.deleteById(id);

    return sendResponse<Member>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Member Deleted Successfully!",
      data: result,
    });
  }
);
