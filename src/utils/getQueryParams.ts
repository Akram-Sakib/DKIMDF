"use server"

// import { NextRequest } from "next/server";

export const getQueryParams = (searchParams: any): Record<string, string> => {
  const params: Record<string, string> = {};

  for (const [key, value] of searchParams) {
    params[key as string] = value as string;
  }
  return params;
};
