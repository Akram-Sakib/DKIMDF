import { paginationHelpers } from "@/helpers/paginationHelper";
import prisma from "@/lib/prisma";
import { IGenericResponse } from "@/types/common";
import { IPaginationOptions } from "@/types/pagination";
import { Project, Prisma } from "@prisma/client";
import { IProjectFilterRequest } from "./project.interface";
import { projectSearchableFields } from "./project.contants";

const create = async (data: Project): Promise<Project> => {
  const newData = await prisma.project.create({
    data: {
      ...data,
    },
  });

  return newData;
};

const getAll = async (
  filters: IProjectFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Project[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: projectSearchableFields.map(field => ({
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

  const whereConditions: Prisma.ProjectWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.project.findMany({
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

  const total = await prisma.project.count({
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



const getById = async (id: string): Promise<Project | null> => {
  const result = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateById = async (
  id: string,
  data: Partial<Project>
): Promise<Project | null> => {
  const result = await prisma.project.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteById = async (id: string): Promise<Project | null> => {
  const result = await prisma.project.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ProjectService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
};
