import prisma from "@/lib/prisma";
import { Member, User } from "@prisma/client";
import { type NextRequest, type NextResponse } from "next/server";

const createMember = async (
  member: Member,
  user: User,
  req: NextRequest
): Promise<Omit<User, "password">> => {
  const existingUser = await prisma.user.findFirst({
    where: {
      phoneNumber: user?.phoneNumber,
    },
  });
  member;
  // check if user already exists
  if (existingUser) {
    throw new Error("User already exists");
  }

  //   // upload file to cloudinary
  //   const file = req.file as IUploadFile;
  //   if (file) {
  //     const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

  //     if (uploadedImage) {
  //       req.body.member.avatarUrl = uploadedImage.secure_url;
  //     }
  //   }
  // req.body.member.avatarUrl = '';
  // set role
  user.role = "member";
  member.phoneNumber = user.phoneNumber;
  member.email = user.email || null;

  // const { title } = member.membership;

  // create user and member in a transaction to ensure data integrity
  const newData = await prisma.$transaction(async (transactionClient) => {
    const userData = await transactionClient.user.create({
      data: user,
    });
    console.log("user Id", userData.id);

    const memberData = await transactionClient.member.create({
      data: { ...member, userId: userData.id },
    });

    // const membershipData = await transactionClient.membership.create({
    //   data: {
    //     title:
    //     memberId: memberData.id,
    //     membershipType: "free",
    //   },
    // });

    return { ...userData, member: memberData };
  });

  if (!newData) {
    throw new Error("Unable to create member");
  }

  return newData;
};

const getUsers = async (): Promise<User[]> => {
  const result = await prisma.user.findMany({
    include: {
      member: true,
    },
  });

  return result;
};

export const UserService = {
  createMember,
  getUsers,
};
