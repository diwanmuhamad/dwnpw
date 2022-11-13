// middleware.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwtDecode from 'jwt-decode';
// This function can be marked `async` if using `await` inside
function checkToken(token) {
    if (!token) return false
    let decoded = jwtDecode(token);
    if (Date.now() > decoded.exp * 1000 || !decoded) {
        return false
    }
    return true

}
export function middleware(request) {
    
    let cookie = request.cookies.get('jwt')?.value;
    cookie = cookie?.split(" ")[1];
    cookie = checkToken(cookie);
     if (request.nextUrl.pathname.startsWith('/admin-secret/admins') && !cookie) {
         return NextResponse.redirect(new URL('/', request.url))
     }

     if (request.nextUrl.pathname.startsWith('/admin-secret/login-admin-dashboard') && cookie) {
        return NextResponse.redirect(new URL('/admin-secret/admins/dashboard', request.url))
     }
 
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin-secret/admins/:path*', '/admin-secret/login-admin-dashboard'],
}