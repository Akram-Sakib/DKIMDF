import { paginationHelpers } from "@/helpers/paginationHelper";
import prisma from "@/lib/prisma";
import { IGenericResponse } from "@/types/common";
import { IPaginationOptions } from "@/types/pagination";
import { PostOffice, Prisma } from "@prisma/client";
import { postOfficeSearchableFields } from "./postoffices.constants";
import { IPostOfficeFilterRequest } from "./postoffices.interface";
import { JwtPayload } from "jsonwebtoken";

const create = async (data: PostOffice, user: JwtPayload): Promise<PostOffice> => {
  const userId = user.userId;
  const newData = await prisma.postOffice.create({
    data: {
      ...data, userId
    },
  });

  return newData;
};

const getAll = async (
  filters: IPostOfficeFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<PostOffice[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: postOfficeSearchableFields.map(field => ({
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

  const whereConditions: Prisma.PostOfficeWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.postOffice.findMany({
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

  const total = await prisma.postOffice.count({
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



const getById = async (id: string): Promise<PostOffice | null> => {
  const result = await prisma.postOffice.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateById = async (
  id: string,
  data: Partial<PostOffice>
): Promise<PostOffice | null> => {
  const result = await prisma.postOffice.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteById = async (id: string): Promise<PostOffice | null> => {
  const result = await prisma.postOffice.delete({
    where: {
      id,
    },
  });

  return result;
};

export const PostOfficeService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
};
