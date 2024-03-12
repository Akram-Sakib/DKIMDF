import { ENUMUSER } from "@/constants/common";
import prisma from "@/lib/prisma";
import { Admin, GrandAdmin, Member, SuperAdmin } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

const getProfile = async (user: JwtPayload): Promise<Admin | SuperAdmin | GrandAdmin | Member | null> => {

  const userId = user.userId;
  const role = user.role;

  let result = null;

  if (role === ENUMUSER.GRAND_ADMIN) {
    result = await prisma.grandAdmin.findUnique({
      where: {
        userId,
      },
      include: {
        presentAddress: true,
        permanentAddress: true
      }
    });
  } else if (role === ENUMUSER.SUPER_ADMIN) {
    result = await prisma.superAdmin.findUnique({
      where: {
        userId,
      },
      include: {
        presentAddress: true,
        permanentAddress: true
      }
    });
  }
  else if (role === ENUMUSER.ADMIN) {
    result = await prisma.admin.findUnique({
      where: {
        userId,
      },
      include: {
        presentAddress: true,
        permanentAddress: true
      }
    });
  }
  else if (role === ENUMUSER.MEMBER) {
    result = await prisma.member.findUnique({
      where: {
        userId,
      },
      include: {
        presentAddress: true,
        permanentAddress: true
      }
    });
  }

  return result;
}

const updateProfile = async (user: JwtPayload, body: any): Promise<Admin | SuperAdmin | GrandAdmin | Member | null> => {

  const userId = user.userId;
  const role = user.role;

  let result = null;

  const { presentAddress, permanentAddress, ...rest } = body;

  if (role === ENUMUSER.GRAND_ADMIN) {

    const hasValues = (obj: any) => Object.values(obj).some(value => value !== null)

    const shouldUpsertPresentAddress = hasValues(presentAddress);
    const shouldUpsertPermanentAddress = hasValues(permanentAddress);

    if (shouldUpsertPresentAddress || shouldUpsertPermanentAddress) {
      const presentAddressResult = await prisma.presentAddress.upsert({
        where: {
          id: rest.presentAddressId || "",
        },
        create: {
          ...presentAddress,
          userId
        },
        update: {
          ...presentAddress,
        }
      });

      const permanentAddressResult = await prisma.permanentAddress.upsert({
        where: {
          id: rest.permanentAddressId || "",
        },
        create: {
          ...permanentAddress,
          userId
        },
        update: {
          ...permanentAddress,
        }
      });

      result = await prisma.grandAdmin.update({
        where: {
          userId,
        },
        data: {
          ...rest,
          presentAddressId: presentAddressResult.id,
          permanentAddressId: permanentAddressResult.id
        },
        include: {
          presentAddress: true,
          permanentAddress: true
        }
      });
    } else {

      // const presentAddressResult = await prisma.presentAddress.upsert({
      //   where: {
      //     id: rest.presentAddressId,
      //   },
      //   create: {
      //     ...presentAddress,
      //     userId
      //   },
      //   update: {
      //     ...presentAddress,
      //   }
      // });

      // const permanentAddressResult = await prisma.permanentAddress.upsert({
      //   where: {
      //     id: rest.permanentAddressId,
      //   },
      //   create: {
      //     ...permanentAddress,
      //     userId
      //   },
      //   update: {
      //     ...permanentAddress,
      //   }
      // });

      result = await prisma.grandAdmin.update({
        where: {
          userId,
        },
        data: {
          ...rest,
          // presentAddressId: presentAddressResult.id,
          // permanentAddressId: permanentAddressResult.id
        },
        include: {
          presentAddress: true,
          permanentAddress: true
        }
      });
    }

  } else if (role === ENUMUSER.SUPER_ADMIN) {
    result = await prisma.superAdmin.update({
      where: {
        userId,
      },
      data: {
        ...body
      }
    });
  }
  else if (role === ENUMUSER.ADMIN) {
    result = await prisma.admin.update({
      where: {
        userId,
      },
      data: {
        ...body
      }
    });
  }
  else if (role === ENUMUSER.MEMBER) {
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
