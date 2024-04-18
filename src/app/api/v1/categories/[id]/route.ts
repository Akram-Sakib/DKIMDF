import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { Category } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { CategoriesService } from "../categories.service";
import { CategoryValidation } from "../categories.validation";
import ErrorResponse from "@/lib/error-response";

export const GET = async (request: NextRequest, context: {
  params: { id: string }
}) => {
  const { id } = context.params;

  try {
    const result = await CategoriesService.getById(id);
    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category Fetched Successfully!",
      data: result,
    };
    return sendResponse(data);
  } catch (error) {
    return ErrorResponse(error)
  }
}

export const PATCH =
  async (
    req: NextRequest,
    {
      params,
    }: {
      params: { id: string };
    }
  ) => {
    const { id } = params;
    try {
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
    } catch (error) {
      return ErrorResponse(error)
    }
  }


export const DELETE =
  async (
    req: NextRequest,
    {
      params,
    }: {
      params: { id: string };
    }
  ) => {
    const { id } = params;

    try {
      const result = await CategoriesService.deleteById(id);
      return sendResponse<Category>({
        statusCode: httpStatus.OK,
        success: true,
        message: "Category Deleted Successfully!",
        data: result,
      });
    } catch (error) {
      return ErrorResponse(error)
    }
  }

