"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Prisma } from "@/generated/prisma/client";
import { ROUTES } from "@/lib/consts";
import { prisma } from "@/lib/prisma";
import { devDelay } from "@/lib/utils";
import { getUserId } from "@/lib/utils-server";

export async function startWorkout(programId: string) {
	await devDelay();
	const userId = await getUserId();

	const session = await prisma.$transaction(async (tx) => {
		// 1. Create the new empty session
		const newSession = await tx.workoutSession.create({
			data: {
				userId,
				programId,
				startedAt: new Date(),
			},
		});

		// 2. Set this as the active session for the user
		await tx.user.update({
			where: { id: userId },
			data: { activeSessionId: newSession.id },
		});

		// 3. Get the list of exercises in this program
		const programExercises = await tx.programHasExercise.findMany({
			where: { programId },
			select: { exerciseId: true },
		});

		// 4. For each exercise, find the last time it was performed
		const setsToCreate: Prisma.SetLogCreateManyInput[] = [];

		for (const { exerciseId } of programExercises) {
			// Find the most recent log for this exercise by this user
			// We order by createdAt desc to get the latest one
			const lastLog = await tx.setLog.findFirst({
				where: {
					userId,
					exerciseId,
				},
				orderBy: { createdAt: "desc" },
				select: { sessionId: true }, // We only need to know which session it was
			});

			// If we found a previous session for this exercise...
			if (lastLog) {
				// ...fetch ALL sets for that exercise from that specific session
				const previousSets = await tx.setLog.findMany({
					where: {
						userId,
						exerciseId,
						sessionId: lastLog.sessionId,
					},
					orderBy: { order: "asc" },
				});

				previousSets.forEach((prevSet) => {
					setsToCreate.push({
						userId,
						sessionId: newSession.id, // Link to the NEW session
						exerciseId: prevSet.exerciseId,
						weight: prevSet.weight,
						reps: prevSet.reps,
						order: prevSet.order,
						isPersonalRecord: false,
						completedAt: null,
					});
				});
			}
		}

		// 5. Bulk insert the copied sets (if any found)
		if (setsToCreate.length > 0) {
			await tx.setLog.createMany({
				data: setsToCreate,
			});
		}

		return newSession;
	});

	redirect(`${ROUTES.WORKOUT}/${session.id}`);
}

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
