import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { getQueryParams } from "@/utils/getQueryParams";
import pick from "@/utils/pick";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { countryFilterableFields } from "./countries.constants";
import { CountryService } from "./countries.service";
import ErrorResponse from "@/lib/error-response";

export const GET =
  async (request: NextRequest, context: any) => {
    const queryParams = getQueryParams(request);

    const filters = pick(queryParams, countryFilterableFields);
    const options = pick(queryParams, ["limit", "page", "sortBy", "sortOrder"]);
    try {
      const result = await CountryService.getAll(filters, options);
      const data = {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Countries Fetched Successfully!",
        data: result ?? {},
      };
      return sendResponse(data);
    } catch (error) {
      return ErrorResponse(error)
    }

  }
