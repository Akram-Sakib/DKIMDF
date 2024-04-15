import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { getQueryParams } from "@/utils/getQueryParams";
import pick from "@/utils/pick";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { postOfficeFilterableFields } from "./postoffices.constants";
import { PostOfficeService } from "./postoffices.service";

export const GET = async (request: NextRequest, context: any) => {
    const queryParams = getQueryParams(request);

    const filters = pick(queryParams, postOfficeFilterableFields);
    const options = pick(queryParams, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await PostOfficeService.getAll(filters, options);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Post Offices Fetched Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
