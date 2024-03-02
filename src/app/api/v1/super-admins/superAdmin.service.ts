import { paginationHelpers } from "@/helpers/paginationHelper";
import prisma from "@/lib/prisma";
import { IGenericResponse } from "@/types/common";
import { IPaginationOptions } from "@/types/pagination";
import { SuperAdmin, Prisma } from "@prisma/client";
import { superAdminSearchableFields } from "./superAdmin.constants";
import { ISuperAdminFilterRequest } from "./superAdmin.interface";
import { JwtPayload } from "jsonwebtoken";

const create = async (data: SuperAdmin, user: JwtPayload): Promise<SuperAdmin> => {
  const userId = user.userId;

  // check if user already exists
  const userExists = await prisma.superAdmin.findFirst({
    where: {
      userId
    }
  });

  if (userExists) {
    throw new Error('User already exists');
  }

  const newData = await prisma.superAdmin.create({
    data: {
      ...data, userId
    },
  });

  return newData;
};

const getAll = async (
  filters: ISuperAdminFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<SuperAdmin[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: superAdminSearchableFields.map(field => ({
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

  const whereConditions: Prisma.SuperAdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.superAdmin.findMany({
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

  const total = await prisma.superAdmin.count({
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



const getById = async (id: string): Promise<SuperAdmin | null> => {
  const result = await prisma.superAdmin.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateById = async (
  id: string,
  data: Partial<SuperAdmin>
): Promise<SuperAdmin | null> => {
  const result = await prisma.superAdmin.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteById = async (id: string): Promise<SuperAdmin | null> => {
  const result = await prisma.superAdmin.delete({
    where: {
      id,
    },
  });

  return result;
};

export const SuperAdminService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
};
