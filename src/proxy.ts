import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { adminAuth } from "@/lib/auth/firebase-admin";
import { COOKIE_SESSION, ROUTES } from "@/lib/consts";

const PUBLIC_PATHS = [ROUTES.LOGIN, ROUTES.REGISTER];

export async function proxy(req: NextRequest) {
	const pathname = req.nextUrl.pathname;

	if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

	const token = req.cookies.get(COOKIE_SESSION)?.value;

	if (!token) return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));

	try {
		await adminAuth.verifySessionCookie(token, true);
		return NextResponse.next();
	} catch (error) {
		console.log(error);
		return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
	}
}

export const config = {
	matcher: "/((?!_next/static|_next/image|favicon.ico|sw.js|manifest.json).*)",
};
