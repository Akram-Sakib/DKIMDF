import prisma from "@/lib/prisma";
import { IGenericResponse } from "@/types/common";
import { Admin, Category, Member, Prisma, User } from "@prisma/client";
import { type NextRequest, type NextResponse } from "next/server";
import { ICategoryFilterRequest } from "./categories.interface";
import { IPaginationOptions } from "@/types/pagination";
import { categorySearchableFields } from "./categories.contants";
import { paginationHelpers } from "@/helpers/paginationHelper";

const create = async (data: Category): Promise<Category> => {
  const newData = await prisma.category.create({
    data: {
      ...data,
    },
  });

  return newData;
};

const getAll = async (
  filters: ICategoryFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Category[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: categorySearchableFields.map(field => ({
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

  const whereConditions: Prisma.CategoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.category.findMany({
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

  const total = await prisma.category.count({
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



const getById = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateById = async (
  id: string,
  data: Partial<Category>
): Promise<Category | null> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteById = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CategoriesService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
};
