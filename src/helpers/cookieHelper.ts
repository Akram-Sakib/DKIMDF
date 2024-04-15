'use server'

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function setToCookie(
  key: string,
  value: string,
  options?: Record<string, any>
) {
  if (!key) {
    return "";
  }
  cookies().set({
    name: key,
    value: value,
    httpOnly: true,
    // path: "/",
  });
}

export async function getCookie(
  key: string,
  options?: Record<string, any>
): Promise<RequestCookie | undefined | string> {
  if (!key) {
    return "";
  }
  const cookie = cookies().get(key);
  return cookie;
}

export async function removeFromCookie(key: string) {
  if (!key) {
    return "";
  }
  cookies().delete(key);
}