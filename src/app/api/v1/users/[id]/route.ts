import ErrorResponse from "@/lib/error-response";
import sendResponse from "@/lib/sendResponse";
import { User } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { UserService } from "../users.service";

// export const GET = async (request, context) => {
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

export const DELETE =
  async (
    req: NextRequest,
    {
      params,
    }: {
      params: { id: string };
    }
  ) => {
    const { id } = params;

    try {
      const result = await UserService.deleteUser(id);
      return sendResponse<Omit<User, "password">>({
        statusCode: httpStatus.OK,
        success: true,
        message: "User Deleted Successfully!",
        data: result,
      });
    } catch (error) {
      return ErrorResponse(error)
    }
  }

export const PATCH = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) => {
  const { id } = params;
  try {
    const body = await req.json();
    // await UserValidation.MemberUserSchema.parseAsync({
    //   body,
    // });
    const result = await UserService.updateUser(id, body);

    return sendResponse<Omit<User, "password">>({
      statusCode: httpStatus.OK,
      success: true,
      message: "User Updated Successfully!",
      data: result,
    });
  } catch (error) {
    return ErrorResponse(error)
  }
}

