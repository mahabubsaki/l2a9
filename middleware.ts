
import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./app/(auth)/_libs/session";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
    const protectedRoutes = ['/dashboard'];
    const path = req.nextUrl.pathname;
    const isProtected = protectedRoutes.includes(path);
    if (isProtected) {
        const { isAuth } = await verifySession();
        if (!isAuth) {

            return NextResponse.redirect(new URL('/sign-up', req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)',]
};