import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./utils/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("Authentication")?.value;
  const protectedPaths = ["/admin/(.*)"];
  const verifiedToken = token ? await verifyAuth(token) : null;
  const isAdmin = verifiedToken?.payload?.us_is_admin;

  if (!verifiedToken) {
    if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  if (verifiedToken && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (verifiedToken && isAdmin) {
    if (
      req.nextUrl.pathname === "/" ||
      req.nextUrl.pathname.startsWith("/sign-in") ||
      req.nextUrl.pathname.startsWith("/sign-up")
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  if (verifiedToken) {
    if (
      req.nextUrl.pathname.startsWith("/sign-up") ||
      req.nextUrl.pathname.startsWith("/sign-in")
    ) {
      return NextResponse.redirect(
        new URL(isAdmin ? "/admin/dashboard" : "/", req.url)
      );
    }
  }
}

export const config = {
  matcher: ["/", "/sign-up", "/sign-in", "/admin/(.*)"],
};
