import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { getQueryParams } from "@/utils/getQueryParams";
import pick from "@/utils/pick";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { postFilterableFields } from "./post.constants";
import { PostService } from "./post.service";

export const GET = async (request: NextRequest, context: any) => {
  const queryParams = getQueryParams(request);

  const filters = pick(queryParams, postFilterableFields);
  const options = pick(queryParams, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await PostService.getAll(filters, options);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Categries Fetched Successfully!",
    data: result,
  };

  return sendResponse(data);
}
