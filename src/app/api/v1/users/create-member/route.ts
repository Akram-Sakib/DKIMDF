import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { User } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { UserService } from "../users.service";
import { UserValidation } from "../users.validation";

const CreateMember = async (request: NextRequest) => {
  const body = await request.json();
  await UserValidation.MemberUserSchema.parseAsync({
    body,
  });
  const { member, presentAddress, permanentAddress, ...userData } = body;
  const result = await UserService.createMember(member, presentAddress, permanentAddress, userData);

  return sendResponse<Omit<User, "password">>({
    statusCode: httpStatus.OK,
    success: true,
    message: "Member created successfully!",
    data: result,
  });
};

const handlers = withErrorHandler(CreateMember);

export { handlers as POST };

