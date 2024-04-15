import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { getQueryParams } from "@/utils/getQueryParams";
import pick from "@/utils/pick";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { categoryFilterableFields } from "./categories.constants";
import { CategoriesService } from "./categories.service";
export const dynamic = 'force-dynamic';

export const GET =
  async (request: NextRequest, context: any) => {
    const queryParams = getQueryParams(request);

    const filters = pick(queryParams, categoryFilterableFields);
    const options = pick(queryParams, ["limit", "page", "sortBy", "sortOrder"]);
    const result = withErrorHandler(async () => await CategoriesService.getAll(filters, options));

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Categries Fetched Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
// );
