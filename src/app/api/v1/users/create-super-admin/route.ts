import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { User } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { UserService } from "../users.service";
import { UserValidation } from "../users.validation";
import { ENUMUSER } from "@/constants/common";
import auth from "@/lib/authMiddleware";

const CreteSuperAdmin = async (request: NextRequest) => {
  await auth([ENUMUSER.GRAND_ADMIN], request);
  const body = await request.json();
  await UserValidation.SuperAdminUserSchema.parseAsync({
    body,
  });
  const { superAdmin, presentAddress, permanentAddress, ...userData } = body;
  const result = await UserService.createSuperAdmin(
    superAdmin,
    presentAddress,
    permanentAddress,
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
