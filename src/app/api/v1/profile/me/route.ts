import { ENUM } from "@/constants/common";
import auth from "@/lib/authMiddleware";
import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { Admin, GrandAdmin, Member, SuperAdmin } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { ProfileService } from "./profile.service";
import { ProfileValidation } from "./profile.validation";

export const GET = withErrorHandler(
  async (request: NextRequest, context: any) => {
    await auth([ENUM.GRAND_ADMIN, ENUM.SUPER_ADMIN, ENUM.ADMIN, ENUM.MEMBER], request)
    const user = (request as any).user;
    const result = await ProfileService.getProfile(user);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "Profile fetched successfully",
      data: result,
    };

    return sendResponse(data);
  }
);


export const PATCH = withErrorHandler(
  async (
    request: NextRequest,
  ) => {
    await auth([ENUM.GRAND_ADMIN, ENUM.SUPER_ADMIN, ENUM.ADMIN, ENUM.MEMBER], request)
    const body = await request.json();
    await ProfileValidation.ProfileUpdateSchema.parseAsync({
      body,
    });
    const user = (request as any).user;
    const result = await ProfileService.updateProfile(user, body);

    return sendResponse<Admin | SuperAdmin | GrandAdmin | Member | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  }
);