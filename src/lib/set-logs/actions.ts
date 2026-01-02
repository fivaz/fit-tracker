"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/lib/consts";
import { prisma } from "@/lib/prisma";
import { SetLogUI } from "@/lib/set-logs/types";
import { getUserId } from "@/lib/utils-server";

export async function upsertSetAction(
	id: string,
	sessionId: string,
	exerciseId: string,
	data: Partial<SetLogUI>,
) {
	const userId = await getUserId();

	await prisma.setLog.upsert({
		where: { id },
		update: {
			weight: data.weight,
			reps: data.reps,
			completedAt: data.completedAt,
		},
		create: {
			id: id,
			userId,
			sessionId: sessionId,
			exerciseId: exerciseId,
			weight: data.weight ?? 0,
			reps: data.reps ?? 0,
			order: data.order ?? 0,
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
