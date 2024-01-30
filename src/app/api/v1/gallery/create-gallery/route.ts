import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { GalleryValidation } from "../gallery.validation";
import { GalleryService } from "../gallery.service";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();
  await GalleryValidation.CreateSchema.parseAsync({
    body,
  });
  const result = await GalleryService.create(body);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "New Gallery Image Created Successfully!",
    data: result,
  };

  return sendResponse(data);
});
