import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { ProjectValidation } from "../project.validation";
import { ProjectService } from "../project.service";

export const POST = withErrorHandler(
  async (request: NextRequest) => {
    const body = await request.json();
    await ProjectValidation.ProjectSchema.parseAsync({
      body,
    });
    const result = await ProjectService.create(body);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "New Project Created Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
);
