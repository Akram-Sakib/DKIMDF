import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { Gallery } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { GalleryService } from "../gallery.service";
import { GalleryValidation } from "../gallery.validation";

export const GET = withErrorHandler(async (request, context) => {
  const { id } = context.params;
  const result = await GalleryService.getById(id);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gallery Image Fetched Successfully!",
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
    await GalleryValidation.UpdateSchema.parseAsync({
      body,
    });
    const result = await GalleryService.updateById(id, body);

    return sendResponse<Gallery>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Gallery Image Updated Successfully!",
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
    const result = await GalleryService.deleteById(id);

    return sendResponse<Gallery>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Gallery Image Deleted Successfully!",
      data: result,
    });
  }
);
