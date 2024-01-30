import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { User } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { UserService } from "../users.service";

// export const GET = withErrorHandler(async (request, context) => {
//   const { id } = context.params;

//   const result = UserService.getUser(id);

//   const data = {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "All users created successfully!",
//     data: result,
//   };

//   return sendResponse(data);
// });

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
    const result = await UserService.deleteUser(id);

    return sendResponse<Omit<User, "password">>({
      statusCode: httpStatus.OK,
      success: true,
      message: "User Deleted Successfully!",
      data: result,
    });
  }
);
