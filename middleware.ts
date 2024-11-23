import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./utils/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(
    process.env.NEXT_PUBLIC_COOKIE_NAME || ""
  )?.value;
  const verifiedToken = token ? await verifyAuth(token) : null;

  const isAdmin = verifiedToken?.payload?.us_is_admin === true;
  const isUser = verifiedToken && !isAdmin;

  const pathIsSignInOrSignUp =
    req.nextUrl.pathname.startsWith("/sign-in") ||
    req.nextUrl.pathname.startsWith("/sign-up");

  const pathIsAdmin = req.nextUrl.pathname.startsWith("/admin");
  const pathIsOrderHistory = req.nextUrl.pathname.startsWith("/order-history");

  if (verifiedToken && pathIsSignInOrSignUp) {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!verifiedToken && (pathIsAdmin || pathIsOrderHistory)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isAdmin && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (isAdmin && pathIsOrderHistory) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (isUser && pathIsAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-up", "/sign-in", "/order-history", "/admin/:path*"],
};
