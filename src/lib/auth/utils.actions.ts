"use server";

import { adminAuth } from "@/lib/auth/firebase-admin";
import { cookies } from "next/headers";
import { COOKIE_SESSION } from "@/lib/consts";

export async function loginServer(idToken: string) {
	// Create a session cookie valid for 14 days
	const expiresIn = 14 * 24 * 60 * 60 * 1000;

	const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

	(await cookies()).set(COOKIE_SESSION, sessionCookie, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/",
		maxAge: expiresIn / 1000,
	});
}

export async function logoutAction() {
	(await cookies()).delete(COOKIE_SESSION);
}
