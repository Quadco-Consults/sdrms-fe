import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  // If in demo mode, allow all requests
  if (isDemoMode) {
    return NextResponse.next();
  }

  // Check if user is authenticated (you can add real auth check here)
  const token = request.cookies.get("next-auth.session-token");

  // Protected routes
  const protectedRoutes = ["/dashboard", "/settings"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Redirect to sign in if trying to access protected route without auth
  if (isProtectedRoute && !token && !isDemoMode) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"],
};
