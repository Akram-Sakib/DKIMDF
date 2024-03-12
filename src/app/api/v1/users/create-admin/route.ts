import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { User } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { UserService } from "../users.service";
import { UserValidation } from "../users.validation";
import auth from "@/lib/authMiddleware";
import { ENUMUSER } from "@/constants/common";

const CreateAdmin = async (request: NextRequest) => {
  await auth([ENUMUSER.GRAND_ADMIN, ENUMUSER.SUPER_ADMIN], request);
  const body = await request.json();
  await UserValidation.AdminUserSchema.parseAsync({
    body,
  });
  const user = (request as any).user
  const { admin, presentAddress, permanentAddress, ...userData } = body;
  const result = await UserService.createAdmin(
    admin, presentAddress, permanentAddress, userData, user, request
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
