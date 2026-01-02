"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/lib/consts";
import { prisma } from "@/lib/prisma";
import { SetLogUI } from "@/lib/set-logs/types";
import { getUserId } from "@/lib/utils-server";

/**
 * Create or update a set log for the current user within a session and revalidate the session's workout route.
 *
 * @param id - The set log ID to upsert; if an existing record with this ID exists it will be updated, otherwise a new record will be created.
 * @param sessionId - The workout session ID the set belongs to; used to revalidate the corresponding workout route after the change.
 * @param exerciseId - The exercise ID associated with the set when creating a new record.
 * @param data - Partial set fields to write; supported properties include `weight`, `reps`, `completedAt`, and `order`. When creating a new record, missing `weight`, `reps`, or `order` default to 0.
 */
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

/**
 * Delete a set log by its ID and revalidate the workout route for the specified session.
 *
 * @param id - The ID of the set log to delete
 * @param sessionId - The session ID whose workout route will be revalidated
 */
export async function deleteSetAction(id: string, sessionId: string) {
	await prisma.setLog.delete({
		where: { id },
	});

	revalidatePath(`${ROUTES.WORKOUT}/${sessionId}`);
}