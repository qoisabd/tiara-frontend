import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./utils/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("Authentication")?.value;
  const protectedPaths = ["/admin"];
  const verifiedToken = token ? await verifyAuth(token) : null;

  const isAdmin = verifiedToken?.payload?.us_is_admin === true;

  const pathIsProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!verifiedToken && pathIsProtected) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (verifiedToken && !isAdmin && pathIsProtected) {
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

  // Redirect pengguna non-admin yang sudah login dari /sign-in atau /sign-up ke halaman utama
  if (verifiedToken && !isAdmin) {
    if (
      req.nextUrl.pathname.startsWith("/sign-up") ||
      req.nextUrl.pathname.startsWith("/sign-in")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Jika tidak ada pengalihan yang diperlukan, izinkan permintaan berlanjut
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-up", "/sign-in", "/admin/:path*"], // Pastikan `matcher` mencakup semua path di bawah `/admin`
};
