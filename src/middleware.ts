import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiMidleware } from "./midleware/api-midleware";

// Middleware function
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api")) {
    return apiMidleware(request);
  }

  const isAuthenticated = false;
  if (!isAuthenticated && request.nextUrl.pathname !== "/auth/login") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isAuthenticated && request.nextUrl.pathname === "/auth/login") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/((?!static|.*\\..*|_next).*)" // All API routes
  ]
};
