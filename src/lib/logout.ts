import { ACCESS_TOKEN_KEY } from "@/constants/common";
import { removeFromCookie } from "@/helpers/cookieHelper";
import { signOut } from "next-auth/react";

export const logoutAsync = async (redirect: boolean = true) => {
    removeFromCookie(ACCESS_TOKEN_KEY)
    await signOut({ redirect });
}

export const logout = () => {
    logoutAsync()
    removeFromCookie(ACCESS_TOKEN_KEY)
}