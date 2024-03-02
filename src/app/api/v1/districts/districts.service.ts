import { paginationHelpers } from "@/helpers/paginationHelper";
import prisma from "@/lib/prisma";
import { IGenericResponse } from "@/types/common";
import { IPaginationOptions } from "@/types/pagination";
import { District, Prisma } from "@prisma/client";
import { districtSearchableFields } from "./districts.constants";
import { IDistrictFilterRequest } from "./districts.interface";
import { JwtPayload } from "jsonwebtoken";

const create = async (data: District, user: JwtPayload): Promise<District> => {
  const isExist = await prisma.district.findFirst({
    where: {
      name: data.name,
    },
  });

  if (isExist) {
    throw new Error('District already exists');
  }
  
  const userId = user.userId;
  const newData = await prisma.district.create({
    data: {
      ...data, userId
    },
  });

  return newData;
};

const getAll = async (
  filters: IDistrictFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<District[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: districtSearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        return {
          [key]: {
            equals: (filterData as Record<string, string>)[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.DistrictWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.district.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
          createdAt: "desc",
        },
  });

  const total = await prisma.district.count({
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

const getById = async (id: string): Promise<District | null> => {
  const result = await prisma.district.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateById = async (
  id: string,
  data: Partial<District>
): Promise<District | null> => {
  const result = await prisma.district.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteById = async (id: string): Promise<District | null> => {
  const result = await prisma.district.delete({
    where: {
      id,
    },
  });

  return result;
};

export const DistrictService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
