import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get('auth_token')?.value;
    const role = request.cookies.get('user_role')?.value;

    const isProtectedRoute = pathname.startsWith('/dashboard');
    const isAuthRoute = pathname.startsWith('/auth');

    // 1. Auth check: Redirect to login if trying to access dashboard without token
    if (isProtectedRoute && !token) {
        // If they were trying to access a doctor route, send to doctor login
        if (pathname.startsWith('/dashboard/docdashboard')) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        // Default to patient login for other dashboard routes
        return NextResponse.redirect(new URL('/auth/patient-login', request.url));
    }

    // 2. Role-based protection check: Ensure users stay in their designated dashboard
    if (isProtectedRoute && token && role) {
        const isDoctorRoute = pathname.startsWith('/dashboard/docdashboard');

        // Define patient-specific routes
        const isPatientOnlyRoute =
            pathname.startsWith('/dashboard/appointments') ||
            pathname.startsWith('/dashboard/home') ||
            pathname.startsWith('/dashboard/chat-history');

        if (role === 'doctor' && isPatientOnlyRoute) {
            return NextResponse.redirect(new URL('/dashboard/docdashboard/home', request.url));
        }

        if (role === 'patient' && isDoctorRoute) {
            return NextResponse.redirect(new URL('/dashboard/home', request.url));
        }
    }

    // 3. Smart Auth Route Redirection
    // Prevent users from seeing their OWN login page if already logged in, 
    // but allow them to see the OTHER role's login page if they want to switch.
    if (isAuthRoute && token) {
        const isTryingDoctorLogin = pathname === '/auth/login';
        const isTryingPatientLogin = pathname === '/auth/patient-login';
        const isTryingRegister = pathname === '/auth/register' || pathname === '/auth/patient-register';

        if (role === 'doctor' && (isTryingDoctorLogin || isTryingRegister)) {
            return NextResponse.redirect(new URL('/dashboard/docdashboard/home', request.url));
        }

        if (role === 'patient' && (isTryingPatientLogin || isTryingRegister)) {
            return NextResponse.redirect(new URL('/dashboard/home', request.url));
        }

        // If it's a generic auth route (like /auth), redirect to their respective dashboard
        if (pathname === '/auth') {
            const target = role === 'doctor' ? '/dashboard/docdashboard/home' : '/dashboard/home';
            return NextResponse.redirect(new URL(target, request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth/:path*'],
};
