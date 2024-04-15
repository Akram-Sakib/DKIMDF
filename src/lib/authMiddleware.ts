import config from '@/config';
import ApiError from '@/errors/ApiError';
import { jwtHelpers } from '@/helpers/jwtHelper';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { type NextRequest } from 'next/server';

const auth = async (requiredRoles: string[], req: NextRequest) => {

  // Get authorization token
  const token = req.headers.get('authorization')

  try {
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // Verify token
    let verifiedUser: any = null; // Adjust the type as needed

    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

    // Role-based guard
    if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        `Forbidden access to this route for ${verifiedUser.role}`,
      );
    }

    // Attach user info to the request
    (req as any).user = verifiedUser;

  } catch (error: any) {
    throw new ApiError(error.statusCode, error.message);
  }
};

export default auth;