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

/**
 * Retrieve the current user's programs as summaries including exercise counts.
 *
 * @returns An array of program summaries where each item has `id`, `name`, and `exerciseCount` representing the number of non-deleted exercises.
 */
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

/**
 * Get the number of programs belonging to the current user that are not deleted.
 *
 * @returns The count of programs for the current user where `deletedAt` is null.
 */
export async function getProgramsCount() {
	await devDelay();

	const userId = await getUserId();

	return prisma.program.count({
		where: { userId, deletedAt: null },
	});
}

/**
 * Retrieve up to three most recent programs based on the user's workout sessions.
 *
 * @returns An array of program summaries containing `id`, `name`, and `exerciseCount` (the number of non-deleted exercises on the program) for up to three most recently started sessions; returns an empty array if no sessions exist.
 */
export async function getRecentPrograms() {
	await devDelay();

	const userId = await getUserId();

	const recentSessions = await prisma.workoutSession.findMany({
		where: { userId },
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
		take: 3,
		distinct: ["programId"],
		orderBy: { startedAt: "desc" },
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

/**
 * Create a new program or update an existing one using values from the provided FormData.
 *
 * @param formData - Form data containing `name` (required) and optional `id` (program id to update)
 * @throws Error if `name` is missing
 */
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

/**
 * Soft-delete the program with the given id for the current user and revalidate the programs route.
 *
 * Sets the program's `deletedAt` timestamp to the current date and triggers revalidation of the programs listing.
 *
 * @param id - The id of the program to soft-delete
 */
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