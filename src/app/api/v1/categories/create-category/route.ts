import { ENUMUSER } from "@/constants/common";
import auth from "@/lib/authMiddleware";
import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { CategoriesService } from "../categories.service";
import { CategoryValidation } from "../categories.validation";

export const POST = withErrorHandler(
  async (request: NextRequest) => {
    await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.ADMIN], request);

    const body = await request.json();
    await CategoryValidation.CategorySchema.parseAsync({
      body,
    });
    const result = await CategoriesService.create(body);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "New Category Created Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
);
