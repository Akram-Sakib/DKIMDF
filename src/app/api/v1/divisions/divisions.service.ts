import { paginationHelpers } from "@/helpers/paginationHelper";
import prisma from "@/lib/prisma";
import { IGenericResponse } from "@/types/common";
import { IPaginationOptions } from "@/types/pagination";
import { Division, Prisma } from "@prisma/client";
import { divisionSearchableFields } from "./divisions.constants";
import { IDivisionFilterRequest } from "./divisions.interface";
import { JwtPayload } from "jsonwebtoken";

const create = async (data: Division, user: JwtPayload): Promise<Division> => {
  const userId = user.userId;
  const isExist = await prisma.division.findFirst({
    where: {
      name: data.name,
    },
  });

  if (isExist) {
    throw new Error('Division already exists');
  }

  const newData = await prisma.division.create({
    data: {
      ...data, userId
    },
  });

  return newData;
};

const getAll = async (
  filters: IDivisionFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Division[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: divisionSearchableFields.map(field => ({
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

  const whereConditions: Prisma.DivisionWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.division.findMany({
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

  const total = await prisma.division.count({
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



const getById = async (id: string): Promise<Division | null> => {
  const result = await prisma.division.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateById = async (
  id: string,
  data: Partial<Division>
): Promise<Division | null> => {
  const result = await prisma.division.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteById = async (id: string): Promise<Division | null> => {
  const result = await prisma.division.delete({
    where: {
      id,
    },
  });

  return result;
};

export const DivisionService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
};
