"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { ROUTES } from "@/lib/consts";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

export async function startWorkout(programId: string) {
	"use server";
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

	redirect(`${ROUTES.WORKOUT}/${programId}`);
}

export async function endWorkout(sessionId: string) {
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
	const userId = await getUserId();

	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			activeSessionId: true,
		},
	});

	return user?.activeSessionId || null;
}

export async function getWorkoutSession(sessionId: string) {
	const userId = await getUserId();

	// 1. Fetch data (Removed the deep 'sets: true' include)
	const session = await prisma.workoutSession.findUnique({
		where: { id: sessionId, userId },
		include: {
			// ✅ Fetch all sets for THIS session only (Flat List)
			setLogs: {
				orderBy: { order: "asc" },
			},
			program: {
				include: {
					exercises: {
						orderBy: { order: "asc" },
						include: {
							exercise: true, // Just get exercise info (name, muscle, img)
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
		sessionId: session.id,
		startedAt: session.startedAt,
		programName: session.program.name,
		exercises: exercisesWithSets,
	};
}
