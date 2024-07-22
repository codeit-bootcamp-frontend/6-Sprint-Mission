import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken");

  // 로그인 안되어있는 경우 접근제한
  if (pathname === "/addboard" || pathname === "/additem") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 로그인 되어 있는 경우 접근제한
  if (pathname === "/login" || pathname === "/signup") {
    if (token) {
      // return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/addboard", "/additem", "/login", "/signup"],
};
