import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { getQueryParams } from "@/utils/getQueryParams";
import pick from "@/utils/pick";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { divisionFilterableFields } from "./divisions.constants";
import { DivisionService } from "./divisions.service";

export const GET = 
  async (request: NextRequest, context: any) => {
    const queryParams = getQueryParams(request);

    const filters = pick(queryParams, divisionFilterableFields);
    const options = pick(queryParams, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await DivisionService.getAll(filters, options);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Divisions Fetched Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
