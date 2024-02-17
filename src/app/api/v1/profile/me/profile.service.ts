import { ENUM } from "@/constants/common";
import prisma from "@/lib/prisma";
import { Admin, GrandAdmin, Member, SuperAdmin } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

const getProfile = async (user: JwtPayload): Promise<Admin | SuperAdmin | GrandAdmin | Member | null> => {

  const userId = user.userId;
  const role = user.role;

  let result = null;

  if (role === ENUM.GRAND_ADMIN) {
    result = await prisma.grandAdmin.findUnique({
      where: {
        userId,
      },
    });
  } else if (role === ENUM.SUPER_ADMIN) {
    result = await prisma.superAdmin.findUnique({
      where: {
        userId,
      },
    });
  }
  else if (role === ENUM.ADMIN) {
    result = await prisma.admin.findUnique({
      where: {
        userId,
      },
    });
  }
  else if (role === ENUM.MEMBER) {
    result = await prisma.member.findUnique({
      where: {
        userId,
      },
    });
  }

  return result;
}

const updateProfile = async (user: JwtPayload, body: any): Promise<Admin | SuperAdmin | GrandAdmin | Member | null> => {

  const userId = user.userId;
  const role = user.role;

  let result = null;

  if (role === ENUM.GRAND_ADMIN) {
    result = await prisma.grandAdmin.update({
      where: {
        userId,
      },
      data: {
        ...body
      }
    });
  } else if (role === ENUM.SUPER_ADMIN) {
    result = await prisma.superAdmin.update({
      where: {
        userId,
      },
      data: {
        ...body
      }
    });
  }
  else if (role === ENUM.ADMIN) {
    result = await prisma.admin.update({
      where: {
        userId,
      },
      data: {
        ...body
      }
    });
  }
  else if (role === ENUM.MEMBER) {
    result = await prisma.member.update({
      where: {
        userId,
      },
      data: {
        ...body
      }
    });
  }

  return result;
}

export const ProfileService = {
  getProfile,
  updateProfile
};
