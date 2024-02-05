import { paginationHelpers } from "@/helpers/paginationHelper";
import prisma from "@/lib/prisma";
import { IGenericResponse } from "@/types/common";
import { IPaginationOptions } from "@/types/pagination";
import { Thana, Prisma } from "@prisma/client";
import { thanaSearchableFields } from "./thana.constants";
import { IThanaFilterRequest } from "./thana.interface";

const create = async (data: Thana): Promise<Thana> => {
  const newData = await prisma.thana.create({
    data: {
      ...data,
    },
  });

  return newData;
};

const getAll = async (
  filters: IThanaFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Thana[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: thanaSearchableFields.map(field => ({
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

  const whereConditions: Prisma.ThanaWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.thana.findMany({
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

  const total = await prisma.thana.count({
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



const getById = async (id: string): Promise<Thana | null> => {
  const result = await prisma.thana.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateById = async (
  id: string,
  data: Partial<Thana>
): Promise<Thana | null> => {
  const result = await prisma.thana.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteById = async (id: string): Promise<Thana | null> => {
  const result = await prisma.thana.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ThanaService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
};
