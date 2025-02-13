import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { protectedRoutes } from './routes';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (
    protectedRoutes.map((route) => route.path).includes(req.nextUrl.pathname) &&
    !token
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (['/login', '/register'].includes(req.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
