import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./utils/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("Authentication")?.value;
  const verifiedToken = token ? await verifyAuth(token) : null;

  const isAdmin = verifiedToken?.payload?.us_is_admin === true;

  const pathIsSignInOrSignUp =
    req.nextUrl.pathname.startsWith("/sign-in") ||
    req.nextUrl.pathname.startsWith("/sign-up");

  const pathIsProtected = ["/admin"].some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (verifiedToken && pathIsSignInOrSignUp) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!verifiedToken && pathIsProtected) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (verifiedToken && !isAdmin && pathIsProtected) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (verifiedToken && isAdmin) {
    if (req.nextUrl.pathname === "/" || pathIsSignInOrSignUp) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-up", "/sign-in", "/admin/:path*"],
};
