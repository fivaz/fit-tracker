import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { adminAuth } from "@/lib/auth-2/firebase-admin";
import { COOKIE_SESSION, ROUTES } from "@/lib/consts";

const PUBLIC_PATHS = [ROUTES.LOGIN, ROUTES.REGISTER];

export async function proxy(req: NextRequest) {
	const pathname = req.nextUrl.pathname;

	// 1. Explicit exclusion for API calls (Safety check)
	if (pathname.startsWith("/api/")) {
		return NextResponse.next();
	}

	// 2. Logging for Public Paths
	if (PUBLIC_PATHS.includes(pathname)) {
		return NextResponse.next();
	}

	const token = req.cookies.get(COOKIE_SESSION)?.value;

	// 3. Log missing tokens
	if (!token) {
		console.warn(`[PROXY] No token found for: ${pathname}. Redirecting to Login.`);
		return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
	}

	try {
		await adminAuth.verifySessionCookie(token, true);
		return NextResponse.next();
	} catch (error) {
		// 4. Detailed Error Logging
		console.error(
			`[PROXY ERROR] Auth failed for ${pathname}:`,
			error instanceof Error ? error.message : error,
		);

		const response = NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
		// Clear the bad cookie so the user isn't stuck in a loop
		response.cookies.delete(COOKIE_SESSION);
		return response;
	}
}

// 5. Exclude /api/ from the matcher entirely
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|sw.js|manifest.json).*)",
	],
};
