import { paginationHelpers } from "@/helpers/paginationHelper";
import prisma from "@/lib/prisma";
import { IGenericResponse } from "@/types/common";
import { IPaginationOptions } from "@/types/pagination";
import { Member, Prisma } from "@prisma/client";
import { memberSearchableFields } from "./member.constants";
import { IMemberAdminFilterRequest } from "./member.interface";
import { JwtPayload } from "jsonwebtoken";
import { ENUMUSER } from "@/constants/common";

const create = async (data: Member, user: JwtPayload): Promise<Member> => {
  const userId = user.userId;

  // check if user already exists
  const userExists = await prisma.member.findFirst({
    where: {
      userId
    }
  });

  if (userExists) {
    throw new Error('User already exists');
  }

  const newData = await prisma.member.create({
    data: {
      ...data, userId
    },
  });

  return newData;
};

const getAll = async (
  filters: IMemberAdminFilterRequest,
  options: IPaginationOptions,
  user: JwtPayload
): Promise<IGenericResponse<Member[]>> => {

  const userId = user.userId;
  const userRole = user.role;

  let userData: any = null
  if (userRole === ENUMUSER.SUPER_ADMIN) {
    userData = await prisma.superAdmin.findFirst({
      where: {
        userId
      }
    });
  } else if (userRole === ENUMUSER.ADMIN) {
    userData = await prisma.admin.findFirst({
      where: {
        userId
      }
    });
  } else if (userRole === ENUMUSER.GRAND_ADMIN) {
    userData = await prisma.grandAdmin.findFirst({
      where: {
        userId
      }
    });
  }


  if (!userData) {
    throw new Error('Admins Not Found');
  }

  const authorizationScope = userData?.authorizationScope;
  const authorizationArea = userData?.authorizationArea;

  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: memberSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        return {
          [key]: {
            equals: (filterData as Record<string, string>)[key],
          },
        };
      }),
    });
  }

  if (authorizationScope && authorizationArea) {
    andConditions.push({
      AND: [
        {
          permanentAddress: {
            [`${authorizationScope}Id`]: authorizationArea
          }
        }
      ]
    });
  }

  const whereConditions: Prisma.MemberWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.member.findMany({
    where: whereConditions,
    // where: {

    // },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
          createdAt: 'desc',
        },
    include: {
      presentAddress: {
        include: {
          country: {
            select: {
              name: true
            }
          },
          division: {
            select: {
              name: true
            }
          },
          district: {
            select: {
              name: true
            }
          },
          thana: {
            select: {
              name: true
            }
          },
          postOffice: {
            select: {
              name: true
            }
          },
          village: {
            select: {
              name: true
            }
          }
        }
      },
      permanentAddress: {
        include: {
          country: {
            select: {
              name: true
            }
          },
          division: {
            select: {
              name: true
            }
          },
          district: {
            select: {
              name: true
            }
          },
          thana: {
            select: {
              name: true
            }
          },
          postOffice: {
            select: {
              name: true
            }
          },
          village: {
            select: {
              name: true
            }
          }
        }
      },
    }
  });

  const total = await prisma.member.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};



const getById = async (id: string): Promise<Member | null> => {
  const result = await prisma.member.findUnique({
    where: {
      id,
    },
    include: {
      presentAddress: {
        include: {
          country: {
            select: {
              name: true
            }
          },
          division: {
            select: {
              name: true
            }
          },
          district: {
            select: {
              name: true
            }
          },
          thana: {
            select: {
              name: true
            }
          },
          postOffice: {
            select: {
              name: true
            }
          },
          village: {
            select: {
              name: true
            }
          }
        }
      },
      permanentAddress: {
        include: {
          country: {
            select: {
              name: true
            }
          },
          division: {
            select: {
              name: true
            }
          },
          district: {
            select: {
              name: true
            }
          },
          thana: {
            select: {
              name: true
            }
          },
          postOffice: {
            select: {
              name: true
            }
          },
          village: {
            select: {
              name: true
            }
          }
        }
      },
    }
  });

  return result;
};

const updateById = async (
  id: string,
  data: Partial<Member>
): Promise<Member | null> => {
  const result = await prisma.member.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteById = async (id: string): Promise<Member | null> => {
  const result = await prisma.member.delete({
    where: {
      id,
    },
  });

  return result;
};

export const MemberService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
};
