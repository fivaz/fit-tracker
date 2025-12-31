"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

export async function createSetAction(exerciseId: string, sessionId: string, order: number) {
	const userId = await getUserId();

	return prisma.setLog.create({
		data: {
			exerciseId,
			sessionId,
			order,
			userId,
			reps: 0,
			weight: 0,
		},
	});
}

export async function updateSetAction(
	id: string,
	data: { reps?: number; weight?: number; completedAt?: string },
) {
	await prisma.setLog.update({
		where: { id },
		data: {
			reps: data.reps,
			weight: data.weight,
			completedAt: data.completedAt ? new Date() : undefined,
		},
	});
}

export async function deleteSetAction(id: string) {
	await prisma.setLog.delete({
		where: { id },
	});
}
