import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { User } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { UserService } from "../users.service";
import { UserValidation } from "../users.validation";

const CreateGrandAdmin = async (request: NextRequest) => {
  const body = await request.json();
  await UserValidation.GrandAdminUserSchema.parseAsync({
    body,
  });
  const { grandAdmin, ...userData } = body;
  const result = await UserService.createGrandAdmin(
    grandAdmin,
    userData,
    request
  );

  return sendResponse<Omit<User, "password">>({
    statusCode: httpStatus.OK,
    success: true,
    message: "Grand Admin created successfully!",
    data: result,
  });
};

const handlers = withErrorHandler(CreateGrandAdmin);

export { handlers as POST };
