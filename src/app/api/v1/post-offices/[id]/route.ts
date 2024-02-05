import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { PostOffice } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { PostOfficeService } from "../postOffices.service";
import { PostOfficeValidation } from "../postOffices.validation";

export const GET = withErrorHandler(async (request, context) => {
  const { id } = context.params;

  const result = await PostOfficeService.getById(id);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post Office Fetched Successfully!",
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
    await PostOfficeValidation.PostOfficeUpdateSchema.parseAsync({
      body,
    });
    const result = await PostOfficeService.updateById(id, body);

    return sendResponse<PostOffice>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Post Office Updated Successfully!",
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
    const result = await PostOfficeService.deleteById(id);

    return sendResponse<PostOffice>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Post Office Deleted Successfully!",
      data: result,
    });
  }
);
