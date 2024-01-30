import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { User } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { UserService } from "../users.service";
import { UserValidation } from "../users.validation";

const CreateAdmin = async (request: NextRequest) => {
  const body = await request.json();
  await UserValidation.AdminUserSchema.parseAsync({
    body,
  });
  const { admin, ...userData } = body;
  const result = await UserService.createAdmin(
    admin,
    userData,
    request
  );

  return sendResponse<Omit<User, "password">>({
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
};

const handlers = withErrorHandler(CreateAdmin);

export { handlers as POST };
