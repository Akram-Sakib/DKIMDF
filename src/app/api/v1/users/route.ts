import { ENUMUSER } from "@/constants/common";
import auth from "@/lib/authMiddleware";
import ErrorResponse from "@/lib/error-response";
import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { UserService } from "./users.service";

const GetUsers = async (request: NextRequest, params: any) => {

  try {
    await auth([ENUMUSER.GRAND_ADMIN], request);
    const result = await UserService.getUsers();

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: "All users fetched successfully!",
      data: result,
    };

    return sendResponse(data);
  } catch (error) {
    return ErrorResponse(error)

  }

};

const handlers = withErrorHandler(GetUsers);

export { handlers as GET };
