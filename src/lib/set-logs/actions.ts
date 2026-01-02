"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/lib/consts";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

export async function createSetAction(exerciseId: string, sessionId: string, order: number) {
	const userId = await getUserId();

	await prisma.setLog.create({
		data: {
			exerciseId,
			sessionId,
			order,
			userId,
			reps: 0,
			weight: 0,
		},
	});

	revalidatePath(`${ROUTES.WORKOUT}/${sessionId}`);
}

export async function updateSetAction(
	id: string,
	sessionId: string,
	data: { reps: number; weight: number; completedAt: Date | null },
) {
	await prisma.setLog.update({
		where: { id },
		data: {
			reps: data.reps,
			weight: data.weight,
			completedAt: data.completedAt,
		},
	});

	revalidatePath(`${ROUTES.WORKOUT}/${sessionId}`);
}

export async function deleteSetAction(id: string, sessionId: string) {
	await prisma.setLog.delete({
		where: { id },
	});

	revalidatePath(`${ROUTES.WORKOUT}/${sessionId}`);
}
