"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { ROUTES } from "@/lib/consts";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

export async function getUser() {
	const userId = await getUserId();

	return prisma.user.findUnique({
		where: {
			id: userId,
		},
	});
}

export async function updateUserProfile(data: { name?: string; email?: string }) {
	const userId = await getUserId();

	await prisma.user.update({
		where: { id: userId },
		data,
	});

	revalidatePath(ROUTES.SETTINGS);
}

export async function updateBodyMetrics(data: {
	weight?: number;
	fatPercentage?: number;
	musclePercentage?: number;
}) {
	const userId = await getUserId();

	await prisma.user.update({
		where: { id: userId },
		data,
	});

	revalidatePath(ROUTES.SETTINGS);
}
