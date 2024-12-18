import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { VillageService } from "../villages.service";
import { VillageValidation } from "../villages.validation";
import auth from "@/lib/authMiddleware";
import { ENUMUSER } from "@/constants/common";

export const POST = withErrorHandler(
  async (request: NextRequest) => {
    await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN, ENUMUSER.ADMIN, ENUMUSER.MEMBER], request);
    const user = (request as any).user
    const body = await request.json();
    await VillageValidation.VillageSchema.parseAsync({
      body,
    });
    const result = await VillageService.create(body, user);

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "New Village Created Successfully!",
      data: result,
    };

    return sendResponse(data);
  }
);
