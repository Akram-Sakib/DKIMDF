import prisma from "@/lib/prisma";
import { Admin, Member, PermanentAddress, PresentAddress, SuperAdmin, User } from "@prisma/client";
import { type NextRequest, type NextResponse } from "next/server";
import { calculateEndTime } from "../subscription/subscription.utils";
// @ts-ignore-next-line
import SSLCommerzPayment from 'sslcommerz-lts';

const getUsers = async (): Promise<User[]> => {
  const result = await prisma.user.findMany({
    include: {
      member: true,
      admin: true,
      superAdmin: true,
    },
  });

  return result;
};

const createMember = async (
  member: Member,
  presentAddress: PresentAddress,
  permanentAddress: PermanentAddress,
  user: User,
): Promise<Omit<User, "password">> => {

  const existingUser = await prisma.user.findFirst({
    where: {
      phoneNumber: user?.phoneNumber,
    },
  });

  // check if user already exists
  if (existingUser) {
    throw new Error("User already exists");
  }

  // set role
  user.role = "member";
  member.phoneNumber = user.phoneNumber;
  member.email = user.email || null;

  // create user and member in a transaction to ensure data integrity
  const newData = await prisma.$transaction(async (transactionClient) => {


    const { subscription, ...restMemberData } = member;

    const { subscriptionFee: subscriptionFeePayload, ...restSubscriptionData } = subscription;

    const userData = await transactionClient.user.create({
      data: user,
    });


    const presentAddressData = await transactionClient.presentAddress.create({
      data: {
        ...presentAddress, userId: userData.id
      },
    });

    const permanentAddressData = await transactionClient.permanentAddress.create({
      data: {
        ...permanentAddress, userId: userData.id
      },
    });


    const memberData = await transactionClient.member.create({
      data: { ...restMemberData, userId: userData.id, presentAddressId: presentAddressData.id, permanentAddressId: permanentAddressData.id },
      include: {
        presentAddress: true,
        permanentAddress: true,
      }
    });

    // // create subscription
    const { registrationFee, smartCardFee, subscriptionFee } =
      subscriptionFeePayload;
    const totalFee =
      Number(registrationFee) + Number(smartCardFee) + Number(subscriptionFee);

    subscriptionFeePayload.totalFee = String(totalFee);

    // get the membership fee from membership table
    const membership = await transactionClient.membership.findUnique({
      where: {
        id: subscription.membershipId,
      },
      include: {
        membershipFee: true,
      },
    });

    if (!membership) {
      throw new Error("Membership not found");
    }

    calculateEndTime(membership, restSubscriptionData);

    // calculate the total fee
    const { totalFee: membershipTotalFee } = membership.membershipFee;

    if (membershipTotalFee !== subscriptionFeePayload.totalFee) {
      throw new Error("Invalid subscription fee");
    }

    const subscriptionFeeData = await transactionClient.subscriptionFee.create({
      data: subscriptionFeePayload,
    });

    if (!subscriptionFeeData) {
      throw new Error("Unable to create subscription fee");
    }

    const subscriptionData = await transactionClient.subscription.create({
      data: {
        ...restSubscriptionData,
        memberId: memberData.userId,
        subscriptionFeeId: subscriptionFeeData.id,
      },
      include: {
        subscriptionFee: true,
      },
    });

    if (!subscriptionData) {
      throw new Error("Unable to create subscription");
    }

    return { ...userData, member: memberData, subscription: subscriptionData };
  }, {
    // maxWait: 20000,
    timeout: 50000
  });

  if (!newData) {
    throw new Error("Unable to create member");
  }

  return newData;
};

const createSuperAdmin = async (
  superAdmin: Member,
  user: User,
  req: NextRequest
): Promise<Omit<User, "password">> => {
  const existingUser = await prisma.user.findFirst({
    where: {
      phoneNumber: user?.phoneNumber,
    },
  });

  // check if user already exists
  if (existingUser) {
    throw new Error("User already exists");
  }

  // set role
  user.role = "super_admin";
  superAdmin.phoneNumber = user.phoneNumber;
  superAdmin.email = user.email || null;

  // const { title } = superAdmin.superAdminship;

  // create user and superAdmin in a transaction to ensure data integrity
  const newData = await prisma.$transaction(async (transactionClient) => {
    const userData = await transactionClient.user.create({
      data: user,
    });

    const superAdminData = await transactionClient.superAdmin.create({
      data: { ...superAdmin, userId: userData.id },
    });

    return { ...userData, superAdmin: superAdminData };
  });

  if (!newData) {
    throw new Error("Unable to create Super Admin");
  }

  return newData;
};

const createAdmin = async (
  admin: Admin,
  user: User,
  req: NextRequest
): Promise<Omit<User, "password">> => {
  const existingUser = await prisma.user.findFirst({
    where: {
      phoneNumber: user?.phoneNumber,
    },
  });
  admin;
  // check if user already exists
  if (existingUser) {
    throw new Error("User already exists");
  }

  // set role
  user.role = "admin";
  admin.phoneNumber = user.phoneNumber;
  admin.email = user.email || null;

  // create user and admin in a transaction to ensure data integrity
  const newData = await prisma.$transaction(async (transactionClient) => {
    const userData = await transactionClient.user.create({
      data: user,
    });

    const adminData = await transactionClient.admin.create({
      data: { ...admin, userId: userData.id },
    });

    return { ...userData, admin: adminData };
  });

  if (!newData) {
    throw new Error("Unable to create Admin");
  }

  return newData;
};

const updateUser = async (
  id: string,
  data: Partial<User & { superAdmin?: SuperAdmin, admin?: Admin, member?: Member }>
): Promise<Omit<User & { superAdmin?: SuperAdmin, admin?: Admin, member?: Member }, "password">> => {

  const { superAdmin, admin, member, ...restData } = data;

  const user = prisma.$transaction(async (transactionClient) => {
    const userData = await transactionClient.user.update({
      where: {
        id,
      },
      data: restData,
    });

    if (superAdmin) {
      const superAdminData = await transactionClient.superAdmin.update({
        where: {
          userId: id,
        },
        data: superAdmin,
      });

      return { ...userData, superAdmin: superAdminData };
    }

    if (admin) {
      const adminData = await transactionClient.admin.update({
        where: {
          userId: id,
        },
        data: admin,
      });

      return { ...userData, admin: adminData };
    }

    

    if (member) {
      const memberData = await transactionClient.member.update({
        where: {
          userId: id,
        },
        data: member,
      });

      return { ...userData, member: memberData };
    }

    return userData;
  });

  return user;
}

export const deleteUser = async (id: string): Promise<User> => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return user;
};

export const UserService = {
  createSuperAdmin,
  createAdmin,
  createMember,
  getUsers,
  deleteUser,
  updateUser,
};
