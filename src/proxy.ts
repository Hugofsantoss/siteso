import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  INVESTIDOR_SESSION_COOKIE,
} from "@/lib/auth/constants";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminLogin = pathname === "/admin/login";
  const isInvestidorLogin = pathname === "/investidor/login";

  if (pathname.startsWith("/admin") && !isAdminLogin) {
    if (!request.cookies.has(ADMIN_SESSION_COOKIE)) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (isAdminLogin && request.cookies.has(ADMIN_SESSION_COOKIE)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (pathname.startsWith("/investidor") && !isInvestidorLogin) {
    if (!request.cookies.has(INVESTIDOR_SESSION_COOKIE)) {
      return NextResponse.redirect(new URL("/investidor/login", request.url));
    }
  }

  if (isInvestidorLogin && request.cookies.has(INVESTIDOR_SESSION_COOKIE)) {
    return NextResponse.redirect(new URL("/investidor", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/investidor/:path*"],
};
