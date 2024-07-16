import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { ACCESS_TOKEN } from './src/api/apiType';

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get(ACCESS_TOKEN);

  if (jwt && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!jwt && request.nextUrl.pathname === '/addboard') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/addboard'],
};

