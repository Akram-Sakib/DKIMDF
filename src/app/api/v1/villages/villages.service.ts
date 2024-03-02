import { paginationHelpers } from "@/helpers/paginationHelper";
import prisma from "@/lib/prisma";
import { IGenericResponse } from "@/types/common";
import { IPaginationOptions } from "@/types/pagination";
import { Village, Prisma } from "@prisma/client";
import { villageSearchableFields } from "./villages.constants";
import { IVillageFilterRequest } from "./villages.interface";
import { JwtPayload } from "jsonwebtoken";

const create = async (data: Village, user: JwtPayload): Promise<Village> => {
  const userId = user.userId;

  const newData = await prisma.village.create({
    data: {
      ...data, userId
    },
  });

  return newData;
};

const getAll = async (
  filters: IVillageFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Village[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: villageSearchableFields.map(field => ({
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

  const whereConditions: Prisma.VillageWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.village.findMany({
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

  const total = await prisma.village.count({
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



const getById = async (id: string): Promise<Village | null> => {
  const result = await prisma.village.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateById = async (
  id: string,
  data: Partial<Village>
): Promise<Village | null> => {
  const result = await prisma.village.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteById = async (id: string): Promise<Village | null> => {
  const result = await prisma.village.delete({
    where: {
      id,
    },
  });

  return result;
};

export const VillageService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
};
