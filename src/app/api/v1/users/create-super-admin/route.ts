import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { User } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { UserService } from "../users.service";
import { UserValidation } from "../users.validation";

const CreteSuperAdmin = async (request: NextRequest) => {
  const body = await request.json();
  await UserValidation.SuperAdminUserSchema.parseAsync({
    body,
  });
  const { superAdmin, ...userData } = body;
  const result = await UserService.createSuperAdmin(
    superAdmin,
    userData,
    request
  );

  return sendResponse<Omit<User, "password">>({
    statusCode: httpStatus.OK,
    success: true,
    message: "Super admin created successfully!",
    data: result,
  });
};

const handlers = withErrorHandler(CreteSuperAdmin);

export { handlers as POST };
