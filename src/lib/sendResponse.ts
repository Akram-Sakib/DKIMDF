import { NextResponse } from "next/server";

type IApiReponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};

const sendResponse = <T>(data: IApiReponse<T>) => {
  const responseData: IApiReponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined,
  };

  return NextResponse.json(responseData, {
    status: data.statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default sendResponse;

// import { Response } from 'express';

// type IApiReponse<T> = {
//   statusCode: number;
//   success: boolean;
//   message?: string | null;
//   meta?: {
//     page: number;
//     limit: number;
//     total: number;
//   };
//   data?: T | null;
// };

// const sendResponse = <T>(res: Response, data: IApiReponse<T>): void => {
//   const responseData: IApiReponse<T> = {
//     statusCode: data.statusCode,
//     success: data.success,
//     message: data.message || null,
//     meta: data.meta || null || undefined,
//     data: data.data || null || undefined,
//   };

//   res.status(data.statusCode).json(responseData);
// };

// export default sendResponse;
