import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { deleteImage } from "./cloudinary";

export const POST =
  async (request: NextRequest) => {

    const body = await request.json();
    const publicId = body.publicId;
    const result = await deleteImage(publicId);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "Image Deleted Successfully!",
      data: result,
    };

    return sendResponse(data);
  }