import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

export const isPasswordMatched = async (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const FindUserByPhoneNumber = async (phoneNumber: string): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: {
      phoneNumber,
    },
  });

  if (!user) {
    throw new Error('User does not exist');
  }

  return user;
};
