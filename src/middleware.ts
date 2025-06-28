import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    response.headers.set("X-DNS-Prefetch-Control", "on");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "origin-when-cross-origin");

    if (request.nextUrl.pathname.startsWith("/_next/") ||
        request.nextUrl.pathname.startsWith("/api/") ||
        request.nextUrl.pathname.includes(".")) {
        response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    response.headers.set("x-pathname", request.nextUrl.pathname);

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}; 