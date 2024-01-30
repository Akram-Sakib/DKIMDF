import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { Post } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { PostService } from "../post.service";
import { PostValidation } from "../post.validation";

export const GET = withErrorHandler(async (request, context) => {
  const { id } = context.params;

  const result = await PostService.getById(id);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post Fetched Successfully!",
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
    await PostValidation.PostSchemaUpdate.parseAsync({
      body,
    });
    const result = await PostService.updateById(id, body);

    return sendResponse<Post>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Post Updated Successfully!",
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
    const result = await PostService.deleteById(id);

    return sendResponse<Post>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Post Deleted Successfully!",
      data: result,
    });
  }
);
