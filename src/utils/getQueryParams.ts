// @ts-nocheck
"use server"
export const dynamic = 'force-dynamic'; 

import { NextRequest } from "next/server";

export const getQueryParams = (req: NextRequest): Record<string, string> => {
  const searchParams = req.nextUrl.searchParams;
  const params = {};

  for (const [key, value] of searchParams) {
    params[key as string] = value as string;
  }
  return params;
};
