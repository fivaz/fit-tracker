"use server";

import { cookies } from "next/headers";

import { User } from "@/generated/prisma/client";
import { adminAuth } from "@/lib/auth/firebase-admin";
import { COOKIE_SESSION, COOKIE_USER } from "@/lib/consts";
import { prisma } from "@/lib/prisma";

export async function getUser(): Promise<User | null> {
	const nextCookies = await cookies();
	const userCookie = nextCookies.get(COOKIE_USER)?.value;

	if (!userCookie) return null;

	try {
		return JSON.parse(userCookie) as User;
	} catch {
		return null;
	}
}

export async function loginServer(idToken: string, user: User) {
	// Session cookie valid for 14 days
	const expiresIn = 14 * 24 * 60 * 60 * 1000;

	const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

	const nextCookies = await cookies();

	// Set session cookie
	nextCookies.set(COOKIE_SESSION, sessionCookie, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/",
		maxAge: expiresIn / 1000,
	});

	// Upsert user in the database
	await prisma.user.upsert({
		where: { id: user.id },
		update: {}, // do nothing if exists
		create: {
			id: user.id,
			email: user.email,
			name: user.name,
		},
	});

	// Set current user info in a non-httpOnly cookie (accessible from client if needed)
	nextCookies.set(COOKIE_USER, JSON.stringify(user), {
		httpOnly: false, // can be accessed from client
		secure: true,
		sameSite: "strict",
		path: "/",
		maxAge: expiresIn / 1000,
	});
}

export async function logoutAction() {
	const nextCookies = await cookies();
	nextCookies.delete(COOKIE_SESSION);
	nextCookies.delete(COOKIE_USER);
}
