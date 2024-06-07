import prisma from "@/lib/prisma";
import { Admin, GrandAdmin, Member, PermanentAddress, PresentAddress, SuperAdmin, User } from "@prisma/client";
import { type NextRequest } from "next/server";
import { calculateEndTime } from "../subscription/subscription.utils";
// @ts-ignore-next-line
import { dataConfig, sslConfig } from "@/config/sslConfig";
import { generateTransactionId } from "@/utils/generateTransactionId";
import { JwtPayload } from "jsonwebtoken";
import config from "@/config";

const getUsers = async (): Promise<User[]> => {
  const result = await prisma.user.findMany({
    include: {
      member: true,
      admin: true,
      superAdmin: true,
    },
    orderBy: {
      createdAt: "desc"
    }
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

    // @ts-ignore
    const { subscription, ...restMemberData } = member;

    // const { startTime, endTime } = subscription;

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
      data: { ...restMemberData, userId: userData.id, presentAddressId: presentAddressData.id, permanentAddressId: permanentAddressData.id, registrationAddress: "permanent" },
      include: {
        presentAddress: true,
        permanentAddress: true,
      }
    });

    // create subscription
    // const { registrationFee, smartCardFee, subscriptionFee } =
    //   subscriptionFeePayload;
    // const totalFee =
    //   Number(registrationFee) + Number(smartCardFee) + Number(subscriptionFee);

    // subscriptionFeePayload.totalFee = String(totalFee);

    // get the membership fee from membership table
    console.log(restMemberData.membershipId);

    const membership = await transactionClient.membership.findUnique({
      where: {
        id: restMemberData.membershipId,
      },
      include: {
        membershipFee: true,
      },
    });

    if (!membership) {
      throw new Error("Membership not found");
    }



    // handle payment
    let transactionId = generateTransactionId();
    const paymentPayloadInfo = dataConfig({
      total_amount: Number(membership.membershipFee.totalFee),
      memberId: memberData.userId,
      tran_id: transactionId,
      membershipId: restMemberData.membershipId,
      success_url: `${config.baseUrl}/api/v1/payments/subscription/success?tran_id=${transactionId}`,
      fail_url: `${config.baseUrl}/api/v1/payments/subscription/fail?tran_id=${transactionId}`,
      cancel_url: `${config.baseUrl}/api/v1/payments/subscription/cancel`,
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

      calculateEndTime(membership, subscription);

      // calculate the total fee
      const { registrationFee,
        smartCardFee, membershipFee, totalFee } = membership.membershipFee;

      // if (membershipTotalFee !== subscriptionFeePayload.totalFee) {
      //   throw new Error("Invalid subscription fee");
      // }


      const subscriptionFeeData = await transactionClient.subscriptionFee.create({
        data: {
          registrationFee,
          smartCardFee,
          subscriptionFee: membershipFee,
          isPaid: false,
          transactionId,
          totalFee
        },
      });

      // console.log(subscriptionFeeData);


      if (!subscriptionFeeData) {
        throw new Error("Unable to create subscription fee");
      }

      const subscriptionData = await transactionClient.subscription.create({
        data: {
          ...subscription,
          memberId: memberData.userId,
          subscriptionFeeId: subscriptionFeeData.id,
          membershipId: membership.id,
        },
        include: {
          subscriptionFee: true,
        },
      });

      if (!subscriptionData) {
        throw new Error("Unable to create subscription");
      }

      paymentGatewayPageURL = result.GatewayPageURL
    }

    return { ...userData, member: memberData, paymentGatewayPageURL, subscription: subscriptionData };
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
  presentAddress: PresentAddress,
  permanentAddress: PermanentAddress,
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

    const superAdminData = await transactionClient.superAdmin.create({
      // @ts-ignore
      data: {
        ...superAdmin, userId: userData.id, presentAddressId: presentAddressData.id,
        permanentAddressId: permanentAddressData.id
      },
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
  presentAddress: PresentAddress,
  permanentAddress: PermanentAddress,
  user: User,
  jwtPayload: JwtPayload,
  req: NextRequest
): Promise<Omit<User, "password">> => {
  // const userId = jwtPayload?.userId
  // const userRole = jwtPayload?.role

  const existingUser = await prisma.user.findFirst({
    where: {
      phoneNumber: user?.phoneNumber,
    },
  });

  // check if user already exists
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Check Authorization Scope
  // let userData: any = null
  // if (userRole === ENUMUSER.SUPER_ADMIN) {
  //   userData = await prisma.superAdmin.findFirst({
  //     where: {
  //       userId
  //     }
  //   });
  // }



  // const authorizationScope = userData?.authorizationScope;
  // const authorizationArea = userData?.authorizationArea;

  // if (authorizationScope && authorizationArea) {
  //   if ((admin.authorizationScope !== authorizationScope) || (admin.authorizationArea !== authorizationArea)) {
  //     throw new ApiError(
  //       httpStatus.FORBIDDEN,
  //       'You are not authorized to create admin for this area!'
  //     );
  //   }
  // }

  // set role
  user.role = "admin";
  admin.phoneNumber = user.phoneNumber;
  admin.email = user.email || null;

  // create user and admin in a transaction to ensure data integrity
  const newData = await prisma.$transaction(async (transactionClient) => {
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

    const adminData = await transactionClient.admin.create({
      data: {
        ...admin, userId: userData.id, presentAddressId: presentAddressData.id,
        permanentAddressId: permanentAddressData.id
      },
    });

    return { ...userData, admin: adminData };
  });

  if (!newData) {
    throw new Error("Unable to create Admin");
  }

  return newData;
};

const createGrandAdmin = async (
  grandAdmin: GrandAdmin,
  user: User,
  req: NextRequest
): Promise<Omit<User, "password">> => {
  const existingUser = await prisma.user.findFirst({
    where: {
      phoneNumber: user?.phoneNumber,
    },
  });
  grandAdmin;
  // check if user already exists
  if (existingUser) {
    throw new Error("User already exists");
  }

  // set role
  user.role = "grand_admin";
  grandAdmin.phoneNumber = user.phoneNumber;
  grandAdmin.email = user.email || null;

  // create user and grandAdmin in a transaction to ensure data integrity
  const newData = await prisma.$transaction(async (transactionClient) => {
    const userData = await transactionClient.user.create({
      data: user,
    });

    const grandAdminData = await transactionClient.grandAdmin.create({
      data: { ...grandAdmin, userId: userData.id },
    });

    return { ...userData, grandAdmin: grandAdminData };
  });

  if (!newData) {
    throw new Error("Unable to create Grand Admin");
  }

  return newData;
}

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
  createGrandAdmin,
  createAdmin,
  createMember,
  getUsers,
  deleteUser,
  updateUser,
};
