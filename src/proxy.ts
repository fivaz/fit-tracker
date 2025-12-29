import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { ROUTES } from "@/lib/consts";

const PUBLIC_PATHS = [ROUTES.LOGIN, ROUTES.REGISTER, "/logout"];

export async function proxy(req: NextRequest) {
	const pathname = req.nextUrl.pathname;

	if (PUBLIC_PATHS.includes(pathname)) {
		return NextResponse.next();
	}

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		console.warn(`[PROXY] No token found for: ${pathname}. Redirecting to Login.`);
		return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * We exclude specific folders and files from the middleware:
		 * - api: All your backend routes
		 * - .well-known: Chrome devtools and other manifest files
		 * - _next/static & _next/image: Next.js internal assets
		 * - favicon.ico, sw.js, manifest.json: Common root-level static files
		 */
		"/((?!api|.well-known|_next/static|_next/image|favicon.ico|sw.js|manifest.json).*)",
	],
};
