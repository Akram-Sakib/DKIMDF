import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { Category } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { CategoriesService } from "../categories.service";
import { CategoryValidation } from "../categories.validation";

export const GET = withErrorHandler(async (request, context) => {
  const { id } = context.params;

  const result = await CategoriesService.getById(id);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category Fetched Successfully!",
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
    await CategoryValidation.CategorySchema.parseAsync({
      body,
    });
    const result = await CategoriesService.updateById(id, body);

    return sendResponse<Category>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Category Updated Successfully!",
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
    const result = await CategoriesService.deleteById(id);

    return sendResponse<Category>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Category Deleted Successfully!",
      data: result,
    });
  }
);
