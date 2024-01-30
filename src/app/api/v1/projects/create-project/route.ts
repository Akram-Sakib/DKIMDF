import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { PostValidation } from "../post.validation";
import { PostService } from "../post.service";

export const POST = withErrorHandler(
  async (request: NextRequest) => {
    const body = await request.json();
    await PostValidation.PostSchema.parseAsync({
      body,
    });
    const result = await PostService.create(body);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "New Post Created Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
);
