import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { Project } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { ProjectService } from "../project.service";
import { ProjectValidation } from "../project.validation";

export const GET = withErrorHandler(async (request, context) => {
  const { id } = context.params;

  const result = await ProjectService.getById(id);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Fetched Successfully!",
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
    await ProjectValidation.ProjectSchemaUpdate.parseAsync({
      body,
    });
    const result = await ProjectService.updateById(id, body);

    return sendResponse<Project>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Project Updated Successfully!",
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
    const result = await ProjectService.deleteById(id);

    return sendResponse<Project>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Project Deleted Successfully!",
      data: result,
    });
  }
);
