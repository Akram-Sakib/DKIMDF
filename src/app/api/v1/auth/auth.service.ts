import httpStatus from 'http-status';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { isPasswordMatched } from './auth.utils';
import prisma from '@/lib/prisma';
import config from '@/config';
import ApiError from '@/errors/ApiError';
import { jwtHelpers } from '@/helpers/jwtHelper';

const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<ILoginUserResponse> => {
  const { email, password } = payload;
  // creating instance of User
  // const user = new User();
  //  // access to our instance methods
  //   const isUserExist = await user.isUserExist(id);

  const isUserExist = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      password: true,
      role: true,
    },
  });


  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refreshTokenSecret as Secret,
    config.jwt.refreshTokenExpiresIn as string
  );

  return {
    accessToken,
    refreshToken,
  };
};


const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwt.decode(token) as JwtPayload;
    // verifiedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;
  const isUserExist = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      role: true,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      userId: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
