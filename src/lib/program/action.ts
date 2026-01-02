"use server";
import { cache } from "react";
import { revalidatePath } from "next/cache";

import { ROUTES } from "@/lib/consts";
import { prisma } from "@/lib/prisma";
import { ProgramSummary } from "@/lib/program/types";
import { devDelay } from "@/lib/utils";
import { getUserId } from "@/lib/utils-server";

export const getProgramByIdWithExercises = cache(async (id: string) => {
	try {
		await devDelay();

		const userId = await getUserId();

		const program = await prisma.program.findUnique({
			where: { id, userId },
			include: {
				exercises: {
					where: {
						exercise: { deletedAt: null },
					},
					include: {
						exercise: true,
					},
				},
			},
		});

		if (!program) {
			return null;
		}

		const exercises = program.exercises.map((ex) => ({
			...ex.exercise,
			programs: [{ programId: program.id }],
		}));

		return { program, exercises };
	} catch (error) {
		console.error("Error fetching program:", error);
		return null;
	}
});

export async function getPrograms(): Promise<ProgramSummary[]> {
	await devDelay();

	const userId = await getUserId();

	const programs = await prisma.program.findMany({
		where: { userId, deletedAt: null },
		select: {
			id: true,
			name: true,
			exercises: {
				where: { exercise: { deletedAt: null } },
				select: { exerciseId: true },
			},
		},
		orderBy: { createdAt: "desc" },
	});

	return programs.map(({ exercises, ...rest }) => {
		const exerciseCount = exercises?.length ?? 0;
		return {
			...rest,
			exerciseCount,
		};
	});
}

export async function getProgramsCount() {
	await devDelay();

	const userId = await getUserId();

	return prisma.program.count({
		where: { userId, deletedAt: null },
	});
}

export async function getRecentPrograms() {
	await devDelay();

	const userId = await getUserId();

	const recentSessions = await prisma.workoutSession.findMany({
		where: { userId },
		orderBy: { startedAt: "desc" },
		distinct: ["programId"],
		take: 3,
		include: {
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

	return recentSessions.map((session) => {
		const program = session.program;
		const exerciseCount = (program.exercises || []).length;
		return {
			id: program.id,
			name: program.name,
			exerciseCount,
		};
	});
}

export async function saveProgram(formData: FormData) {
	await devDelay();

	const userId = await getUserId();

	const id = formData.get("id")?.toString();
	const name = formData.get("name")?.toString();

	if (!name) {
		throw new Error("Please provide a name for the program.");
	}

	if (id) {
		await prisma.program.update({
			where: { id, userId },
			data: { name },
		});
	} else {
		await prisma.program.create({
			data: { name, userId },
		});
	}

	revalidatePath(ROUTES.PROGRAMS);
}

export async function deleteProgramAction(id: string) {
	await devDelay();

	const userId = await getUserId();

	await prisma.program.update({
		where: { id, userId },
		data: {
			deletedAt: new Date(),
		},
	});

	revalidatePath(ROUTES.PROGRAMS);
}
