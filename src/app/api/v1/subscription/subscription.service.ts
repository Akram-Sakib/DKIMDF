import { paginationHelpers } from "@/helpers/paginationHelper";
import prisma from "@/lib/prisma";
import { IGenericResponse } from "@/types/common";
import { IPaginationOptions } from "@/types/pagination";
import { Subscription, SubscriptionFee, Prisma } from "@prisma/client";
import { ISubscriptionFilterRequest } from "./subscription.interface";
import { subscriptionFilterableFields } from "./subscription.constants";

const create = async (
  subscriptionFeePayload: SubscriptionFee,
  subscriptionPayload: Subscription
): Promise<Subscription> => {
  const newData = await prisma.$transaction(async (transactionClient) => {
    // calculate the subscription total fee
    const { registrationFee, smartCardFee, subscriptionFee } =
      subscriptionFeePayload;
    const totalFee =
      Number(registrationFee) + Number(smartCardFee) + Number(subscriptionFee);
    subscriptionFeePayload.totalFee = String(totalFee);

    // get the membership fee from membership table
    const membership = await transactionClient.membership.findUnique({
      where: {
        id: subscriptionPayload.membershipId,
      },
      include: {
        membershipFee: true,
      },
    });

    if (!membership) {
      throw new Error("Membership not found");
    }

    subscriptionPayload.startTime = new Date(
      new Date().setDate(new Date().getDate())
    );
    // calculate the end time based on the membership type
    if (membership?.type === "weekly") {
      subscriptionPayload.endTime = new Date(
        new Date().setDate(new Date().getDate() + 7)
      );
    } else if (membership?.type === "monthly") {
      subscriptionPayload.endTime = new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      );
    } else if (
      membership?.type === "halfYearly" &&
      subscriptionPayload.endTime
    ) {
      subscriptionPayload.endTime = new Date(
        new Date().setMonth(new Date().getMonth() + 6)
      );
    } else if (membership?.type === "yearly") {
      subscriptionPayload.endTime = new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      );
    } else if (membership?.type === "lifeTime") {
      subscriptionPayload.endTime = new Date(
        new Date().setFullYear(new Date().getFullYear() + 100)
      );
    }


    // calculate the total fee
    const { totalFee: membershipTotalFee } = membership.membershipFee;

    if (membershipTotalFee !== subscriptionFeePayload.totalFee) {
      throw new Error("Invalid subscription fee");
    }

    const subscriptionFeeData = await transactionClient.subscriptionFee.create({
      data: subscriptionFeePayload,
    });

    const subscriptionData = await transactionClient.subscription.create({
      data: {
        ...subscriptionPayload,
        subscriptionFeeId: subscriptionFeeData.id,
      },
      include: {
        subscriptionFee: true,
      },
    });

    return subscriptionData;
  });

  if (!newData) {
    throw new Error("Unable to create subscription");
  }

  return newData;
};

const getAll = async (
  filters: ISubscriptionFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Subscription[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: subscriptionFilterableFields.map((field) => ({
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

  const whereConditions: Prisma.SubscriptionWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.subscription.findMany({
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
      subscriptionFee: true,
    },
  });

  const total = await prisma.subscription.count({
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

const getById = async (id: string): Promise<Subscription | null> => {
  const result = await prisma.subscription.findUnique({
    where: {
      id,
    },
    include: {
      subscriptionFee: true,
    },
  });

  return result;
};

const updateById = async (
  id: string,
  subscriptionFeeResult: SubscriptionFee,
  data: Partial<Subscription>
): Promise<Subscription | null> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    if (subscriptionFeeResult) {
      const currentSubscription =
        await transactionClient.subscription.findUnique({
          where: {
            id,
          },
          include: {
            subscriptionFee: true,
          },
        });

      if (!currentSubscription) {
        throw new Error("Subscription not found");
      }

      const {
        registrationFee,
        smartCardFee,
        subscriptionFee: subscriptionFee,
      } = subscriptionFeeResult as SubscriptionFee;
      const totalFee =
        Number(registrationFee) +
        Number(smartCardFee) +
        Number(subscriptionFee);
      subscriptionFeeResult.totalFee = String(totalFee);
      await transactionClient.subscriptionFee.update({
        where: {
          id: currentSubscription?.subscriptionFeeId,
        },
        data: subscriptionFee,
      });
    }

    return await transactionClient.subscription.update({
      where: {
        id,
      },
      data,
      include: {
        subscriptionFee: true,
      },
    });
  });

  return result;
};

const deleteById = async (id: string): Promise<Subscription | null> => {
  const result = await prisma.subscription.delete({
    where: {
      id,
    },
    include: {
      subscriptionFee: true,
    },
  });

  return result;
};

export const SubscriptionService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
