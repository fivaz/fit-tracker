"use server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export async function getUserId() {
	const session = await auth.api.getSession({
		headers: await headers(), // you need to pass the headers object.
	});

	if (!session) throw new Error("Unauthorized");

	return session.user.id;
}
