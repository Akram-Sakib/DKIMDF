import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Negotiator from "negotiator";
import { match } from '@formatjs/intl-localematcher'

// const rolesRedirect: Record<string, unknown> = {
//   buyer: `${envConfig.siteUrl}/`,
//   seller: `${envConfig.siteUrl}/dashboard`,
//   admin: `${envConfig.siteUrl}/dashboard`,
// };


// let locales = ['en', 'bn']
// let defaultLocale = 'en'

// function getLocale(request: NextRequest) {
//     let acceptedLanguage = request.headers.get('accept-language') ?? undefined;
//     let headers = { 'accept-language': acceptedLanguage }
//     let languages = new Negotiator({ headers }).languages()

//     return match(languages, locales, defaultLocale)
// }

const onlyForAdmin = (dynamicRoute: string) => {
    return {
        routes: ["/dashboard/manage-admins/super-admins"],
        dynamicRoutes: [
            `/dashboard/manage-admins/super-admins/${dynamicRoute}`,
        ]
    }
};

const excludeForMemberAndAdmin = (dynamicRoute: string) => {
    return {
        routes: ["/dashboard/manage-admins/super-admins"],
        dynamicRoutes: [
            `/dashboard/manage-admins/super-admins/${dynamicRoute}`,
            `/dashboard/manage-admins/admins/${dynamicRoute}`,
            `/dashboard/manage-admins/grand-admins/${dynamicRoute}`,
        ]
    }
};

const excludeForMember = (dynamicRoute: string) => {
    return {
        routes: ["/dashboard/manage-admins", "/dashboard/membership", "/dashboard/members", "/dashboard/projects", "/dashboard/places/countries", "/dashboard/places/divisions", "/dashboard/places/districts", "/dashboard/places/police-stations", "/dashboard/places/post-offices","/dashboard/projects"],
        dynamicRoutes: [
            `/dashboard/subscription/list/${dynamicRoute}`,
        ]
    }
};

const onlyForMember = () => {
    return {
        routes: ["/dashboard/subscription/list/buy-subscription"],
    }
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // const pathNameIsMissingLocale = locales.every(
    //     (locale) => !pathname.startsWith(`/${locale}`) && !pathname.startsWith(`/${locale}/`)
    // )

    // if (pathNameIsMissingLocale) {
    //     const locale = getLocale(request)
    //     return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.nextUrl));
    // }

    const token = await getToken({
        req: request,
    });

    // console.log(!token && pathname !== "/login");

    const role = token?.role as string;

    const isGrandAdmin = role === "grand_admin";
    const isSuperAdmin = role === "super_admin";
    const isAdmin = role === "admin";
    const isMember = role === "member";


    // if (!token && pathname !== "/login") {
    //     return NextResponse.redirect(new URL(`/login?from=${pathname}`, request.nextUrl));
    // } else if (token && pathname === "/login") {
    //     return NextResponse.redirect(new URL("/", request.nextUrl));
    // }

    if (!isMember) {
        const redirectRoute = onlyForMember().routes.find(route => pathname.startsWith(route));
        if (redirectRoute) {
            return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
        }
    }

    // Prioritize Grand Admin check for unrestricted access
    if (isGrandAdmin) {
        return NextResponse.next();
    }

    if (!isGrandAdmin && pathname.startsWith(onlyForAdmin(pathname.split("/")[4]).dynamicRoutes[0])) {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
    if (isAdmin || isMember) {
        const redirectRoute = excludeForMemberAndAdmin(pathname.split("/")[4]).routes.find(route => pathname.startsWith(route));
        const redirectDynamicRoute = excludeForMemberAndAdmin(pathname.split("/")[4]).dynamicRoutes.find(route => pathname.startsWith(route));
        if (redirectRoute || redirectDynamicRoute) {
            return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
        }
    }

    if (isMember) {
        const redirectRoute = excludeForMember(pathname.split("/")[4]).routes.find(route => pathname.startsWith(route));
        const redirectDynamicRoute = excludeForMember(pathname.split("/")[4]).dynamicRoutes.find(route => pathname.startsWith(route));
        if (redirectRoute || (!(redirectDynamicRoute as any)?.includes("/buy-subscription") && redirectDynamicRoute)) {
            return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/projects", "/login", "/dashboard/:page*", '/((?!_next).*)',
    ],
};