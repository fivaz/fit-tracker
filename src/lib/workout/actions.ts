"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { ROUTES } from "@/lib/consts";
import { prisma } from "@/lib/prisma";
import { devDelay } from "@/lib/utils";
import { getUserId } from "@/lib/utils-server";

/**
 * Starts a new workout session for the current user and navigates to it.
 *
 * Creates a workout session tied to the given program, records the session start time,
 * sets the user's activeSessionId to the new session, and redirects the client to the workout route for that session.
 *
 * @param programId - The ID of the workout program to start
 */
export async function startWorkout(programId: string) {
	"use server";
	await devDelay();

	const userId = await getUserId();

	const session = await prisma.workoutSession.create({
		data: {
			userId,
			programId,
			startedAt: new Date(),
		},
	});

	await prisma.user.update({
		where: { id: userId },
		data: { activeSessionId: session.id },
	});

	redirect(`${ROUTES.WORKOUT}/${session.id}`);
}

/**
 * Marks the specified workout session as completed and clears the user's active session.
 *
 * Also triggers revalidation of the progress path and redirects the user to the home route.
 *
 * @param sessionId - The ID of the workout session to mark completed
 */
export async function endWorkout(sessionId: string) {
	await devDelay();

	const userId = await getUserId();

	await prisma.workoutSession.update({
		where: { id: sessionId },
		data: { completedAt: new Date() },
	});

	await prisma.user.update({
		where: { id: userId },
		data: { activeSessionId: null },
	});

	revalidatePath(ROUTES.PROGRESS);
	redirect(ROUTES.HOME);
}

/**
 * Retrieve the current user's active workout session ID.
 *
 * @returns The active session ID for the current user, or `null` if none.
 */
export async function getActiveSessionId() {
	await devDelay();

	const userId = await getUserId();

	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			activeSessionId: true,
		},
	});

	return user?.activeSessionId || null;
}

export const getWorkoutSessionById = cache(async (id: string) => {
	await devDelay();

	const userId = await getUserId();

	// 1. Fetch data (Removed the deep 'sets: true' include)
	const session = await prisma.workoutSession.findUnique({
		where: { id: id, userId },
		include: {
			// Fetch all sets for THIS session only (Flat List)
			setLogs: {
				orderBy: { order: "asc" },
			},
			program: {
				include: {
					exercises: {
						where: {
							exercise: {
								deletedAt: null,
							},
						},
						orderBy: { order: "asc" },
						include: {
							exercise: true,
						},
					},
				},
			},
		},
	});

	if (!session || session.completedAt) {
		return null;
	}

	// 2. Transform: Distribute the flat logs into the exercises
	// This creates the exact "Nested" structure your UI wants
	const exercisesWithSets = session.program.exercises.map((pe) => {
		const exerciseSets = session.setLogs.filter((log) => log.exerciseId === pe.exerciseId);

		return {
			...pe.exercise, // Name, info, etc.
			// We manually attach the specific sets for this session here
			setLogs: exerciseSets,
		};
	});

	// 3. Return a clean object for the page
	return {
		id: session.id,
		startedAt: session.startedAt,
		programName: session.program.name,
		exercises: exercisesWithSets,
	};
});