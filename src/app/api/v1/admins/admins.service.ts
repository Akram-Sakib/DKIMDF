import { ENUMUSER } from "@/constants/common";
import { paginationHelpers } from "@/helpers/paginationHelper";
import prisma from "@/lib/prisma";
import { IGenericResponse } from "@/types/common";
import { IPaginationOptions } from "@/types/pagination";
import { Admin, PermanentAddress, PresentAddress, Prisma } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { adminSearchableFields } from "./admins.constants";
import { IAdminFilterRequest } from "./admins.interface";

const create = async (data: Admin, user: JwtPayload): Promise<Admin> => {
  const userId = user.userId;
 

  const newData = await prisma.admin.create({
    data: {
      ...data, userId
    },
  });

  return newData;
};

const getAll = async (
  filters: IAdminFilterRequest,
  options: IPaginationOptions,
  user: JwtPayload
): Promise<IGenericResponse<Admin[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

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

  const authorizationScope = userData?.authorizationScope;
  const authorizationArea = userData?.authorizationArea;

  if (search) {
    andConditions.push({
      OR: adminSearchableFields.map(field => ({
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

  const whereConditions: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
          createdAt: 'desc',
        },
  });

  const total = await prisma.admin.count({
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



const getById = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
    include: {
      presentAddress: true,
      permanentAddress: true
    }
  });

  return result;
};

const updateById = async (
  id: string,
  data: Partial<Admin & {
    presentAddress: PresentAddress;
    permanentAddress: PermanentAddress;
  }>
): Promise<Admin | null> => {

  const { presentAddress, permanentAddress, ...restData } = data;

  const result = await prisma.admin.update({
    where: {
      id,
    },
    // @ts-ignore
    data: {
      ...restData,
      presentAddress: {
        update: presentAddress
      },
      permanentAddress: {
        update: permanentAddress
      }
    },
    include: {
      presentAddress: true,
      permanentAddress: true
    }
  });

  return result;
};

const deleteById = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.delete({
    where: {
      id,
    },
  });

  return result;
};

export const AdminService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
};
