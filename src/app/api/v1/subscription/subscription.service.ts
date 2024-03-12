import { calculateEndTime } from './subscription.utils';
import { paginationHelpers } from "@/helpers/paginationHelper";
import prisma from "@/lib/prisma";
import { IGenericResponse } from "@/types/common";
import { IPaginationOptions } from "@/types/pagination";
import { Subscription, SubscriptionFee, Prisma } from "@prisma/client";
import { ISubscriptionFilterRequest } from "./subscription.interface";
import { subscriptionFilterableFields } from "./subscription.constants";
import { JwtPayload } from "jsonwebtoken";
import { generateTransactionId } from '@/utils/generateTransactionId';
import { dataConfig, sslConfig } from '@/config/sslConfig';

const create = async (
  membershipId: string,
  user: JwtPayload
): Promise<Subscription> => {

  const memberId = user.userId

  // get member data
  const memberData = await prisma.member.findFirst({
    where: {
      userId: memberId,
    },
  });

  if (!memberData) {
    throw new Error("Member not found");
  }

  const existingSubscription = await prisma.subscription.findMany({
    where: {
      memberId,
      subscriptionFee: {
        isPaid: true
      }
    },
    take: 1,
    orderBy: {
      createdAt: "desc"
    }
  });
  let startTime: Date;
  if (existingSubscription) {
    // get the end time of the existing subscription
    const { endTime } = existingSubscription[0];
    // set the start time of the new subscription to the end time of the existing subscription
    startTime = new Date(endTime);
  }


  const newData = await prisma.$transaction(async (transactionClient) => {

    // get the membership fee from membership table
    const membership = await transactionClient.membership.findUnique({
      where: {
        id: membershipId,
      },
      include: {
        membershipFee: true,
      },
    });

    if (!membership) {
      throw new Error("Membership not found");
    }

    // calculate the subscription total fee
    const { membershipFee } =
      membership.membershipFee;



    const subscriptionPayload: any = {
      startTime,
      endTime: ""
    }
    calculateEndTime(membership, subscriptionPayload);


    // handle payment
    let transactionId = generateTransactionId();
    const paymentPayloadInfo = dataConfig({
      total_amount: Number(membershipFee),
      memberId: memberData.userId,
      tran_id: transactionId,
      membershipId: membership.id,
      success_url: `http://localhost:3000/api/v1/payments/subscription/success?tran_id=${transactionId}`,
      fail_url: `http://localhost:3000/api/v1/payments/subscription/fail?tran_id=${transactionId}`,
      cancel_url: "http://localhost:3000/api/v1/payments/subscription/cancel",
      product_name: membership.title,
      product_category: "mobile",
      cus_name: memberData.firstName + " " + memberData.lastName,
      cus_email: memberData.email,
      cus_add1: "Lalmonirhat",
      cus_phone: memberData.phoneNumber,
    });
    const result = await sslConfig.init(paymentPayloadInfo);

    let paymentGatewayPageURL = "";
    let subscriptionData = null;

    if (!result.GatewayPageURL || result.status === "FAILED") {
      // return NextResponse.json({ message: result.failedreason });
    } else if (result.status === "SUCCESS") {

      const subscriptionFeeData = await transactionClient.subscriptionFee.create({
        data: { subscriptionFee: membershipFee, totalFee: membershipFee, transactionId },
      });

      subscriptionData = await transactionClient.subscription.create({
        data: {
          ...subscriptionPayload,
          memberId,
          subscriptionFeeId: subscriptionFeeData.id,
          membershipId: membership.id,
        },
        include: {
          subscriptionFee: true,
        },
      });

      console.log(result);


      paymentGatewayPageURL = result.GatewayPageURL;
    }

    return { ...subscriptionData, paymentGatewayPageURL };
  }, {
    timeout: 10000
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
