import { paginationHelpers } from "@/helpers/paginationHelper";
import prisma from "@/lib/prisma";
import { IGenericResponse } from "@/types/common";
import { IPaginationOptions } from "@/types/pagination";
import { Prisma, Gallery } from "@prisma/client";
import { gallerySearchableFields } from "./gallery.constants";
import { IGalleryFilterRequest } from "./gallery.interface";

const create = async (data: Gallery): Promise<Gallery> => {
  const newData = await prisma.gallery.create({
    data: {
      ...data,
    },
  });

  return newData;
};

const getAll = async (
  filters: IGalleryFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Gallery[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: gallerySearchableFields.map((field) => ({
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

  const whereConditions: Prisma.GalleryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.gallery.findMany({
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

  const total = await prisma.gallery.count({
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

const getById = async (id: string): Promise<Gallery | null> => {
  const result = await prisma.gallery.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateById = async (
  id: string,
  data: Partial<Gallery>
): Promise<Gallery | null> => {
  const result = await prisma.gallery.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteById = async (id: string): Promise<Gallery | null> => {
  const result = await prisma.gallery.delete({
    where: {
      id,
    },
  });

  return result;
};

export const GalleryService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
