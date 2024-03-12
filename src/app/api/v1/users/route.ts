import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";
import { UserService } from "./users.service";
import { NextRequest } from "next/server";
import auth from "@/lib/authMiddleware";
import { ENUMUSER } from "@/constants/common";

const GetUsers = async (request: NextRequest, params: any) => {

  await auth([ENUMUSER.GRAND_ADMIN], request);
  const result = await UserService.getUsers();

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "All users fetched successfully!",
    data: result,
  };

  return sendResponse(data);
};

const handlers = withErrorHandler(GetUsers);

export { handlers as GET }