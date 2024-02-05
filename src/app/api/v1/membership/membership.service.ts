import { paginationHelpers } from "@/helpers/paginationHelper";
import prisma from "@/lib/prisma";
import { IGenericResponse } from "@/types/common";
import { IPaginationOptions } from "@/types/pagination";
import { Membership, MembershipFee, Prisma } from "@prisma/client";
import { IMembershipFilterRequest } from "./membership.interface";
import { membershipFilterableFields } from "./membership.constants";
type MembershipServiceType = Prisma.MembershipGetPayload<{
  include: {
    membershipFee: true;
  };
}>;
const create = async (
  membershipFee: MembershipFee,
  data: Membership
): Promise<Membership> => {
  const newData = await prisma.$transaction(async (transactionClient) => {
    const {
      registrationFee,
      smartCardFee,
      membershipFee: subscriptionFee,
    } = membershipFee;
    const totalFee =
      Number(registrationFee) + Number(smartCardFee) + Number(subscriptionFee);
    membershipFee.totalFee = String(totalFee);
    const membershipFeeData = await transactionClient.membershipFee.create({
      data: membershipFee,
    });

    const membershipData = await transactionClient.membership.create({
      data: { ...data, memberShipFeeId: membershipFeeData.id },
      include: {
        membershipFee: true,
      },
    });

    return membershipData;
  });

  if (!newData) {
    throw new Error("Unable to create membership");
  }

  return newData;
};

const getAll = async (
  filters: IMembershipFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Membership[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: membershipFilterableFields.map((field) => ({
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

  const whereConditions: Prisma.MembershipWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.membership.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
    include: {
      membershipFee: true,
    },
  });

  const total = await prisma.membership.count({
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

const getById = async (id: string): Promise<Membership | null> => {
  const result = await prisma.membership.findUnique({
    where: {
      id,
    },
    include: {
      membershipFee: true,
    },
  });

  return result;
};

const updateById = async (
  id: string,
  membershipFee: MembershipFee,
  data: Partial<Membership>
): Promise<Membership | null> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    if (membershipFee) {
      const currentMembership = await transactionClient.membership.findUnique({
        where: {
          id,
        },
        include: {
          membershipFee: true,
        },
      });

      if (!currentMembership) {
        throw new Error("Membership not found");
      }

      const {
        registrationFee,
        smartCardFee,
        membershipFee: subscriptionFee,
      } = membershipFee as MembershipFee;
      const totalFee =
        Number(registrationFee) +
        Number(smartCardFee) +
        Number(subscriptionFee);
      membershipFee.totalFee = String(totalFee);
      await transactionClient.membershipFee.update({
        where: {
          id: currentMembership?.memberShipFeeId,
        },
        data: membershipFee,
      });
    }

    return await transactionClient.membership.update({
      where: {
        id,
      },
      data,
      include: {
        membershipFee: true,
      },
    });
  });

  return result;
};

const deleteById = async (id: string): Promise<Membership | null> => {
  const result = await prisma.membership.delete({
    where: {
      id,
    },
    include: {
      membershipFee: true,
    },
  });

  return result;
};

export const MembershipService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
