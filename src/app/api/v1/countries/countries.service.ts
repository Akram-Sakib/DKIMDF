import { paginationHelpers } from "@/helpers/paginationHelper";
import prisma from "@/lib/prisma";
import { IGenericResponse } from "@/types/common";
import { IPaginationOptions } from "@/types/pagination";
import { Country, Prisma } from "@prisma/client";
import { countrySearchableFields } from "./countries.constants";
import { ICountryFilterRequest } from "./countries.interface";
import { JwtPayload } from "jsonwebtoken";

const create = async (data: Country, user: JwtPayload): Promise<Country> => {
  const userId = user.userId;
  const isExist = await prisma.country.findFirst({
    where: {
      name: data.name,
    },
  });

  if (isExist) {
    throw new Error('Country already exists');
  }
  
  const newData = await prisma.country.create({
    data: {
      ...data,
      userId
    },
  });

  return newData;
};

const getAll = async (
  filters: ICountryFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Country[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: countrySearchableFields.map(field => ({
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

  const whereConditions: Prisma.CountryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.country.findMany({
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

  const total = await prisma.country.count({
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



const getById = async (id: string): Promise<Country | null> => {
  const result = await prisma.country.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateById = async (
  id: string,
  data: Partial<Country>
): Promise<Country | null> => {
  const result = await prisma.country.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteById = async (id: string): Promise<Country | null> => {
  const result = await prisma.country.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CountryService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
};
