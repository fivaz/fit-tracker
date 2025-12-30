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

	const session = await prisma.workoutSession.findUnique({
		where: { id: sessionId, userId },
		include: {
			program: {
				include: {
					exercises: {
						orderBy: { order: "asc" },
						include: { exercise: true },
					},
				},
			},
		},
	});

	// If session doesn't exist or is already finished, 404 or redirect
	if (!session || session.completedAt) {
		return null;
	}

	return session;
}
