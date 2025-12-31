"use server";
import { cache } from "react";
import { revalidatePath } from "next/cache";

import { Program } from "@/generated/prisma/client";
import { ROUTES } from "@/lib/consts";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

export const getProgramById = cache(async (id: string) => {
	try {
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

		return program;
	} catch (error) {
		console.error("Error fetching program:", error);
		return null;
	}
});

export async function getPrograms(): Promise<
	Array<Program & { exercises: { exerciseId: string }[] }>
> {
	const userId = await getUserId();

	return prisma.program.findMany({
		where: { userId, deletedAt: null },
		include: {
			exercises: {
				where: {
					exercise: { deletedAt: null },
				},
				// We only need the ID to count, keeps the payload small
				select: { exerciseId: true },
			},
		},
		orderBy: { createdAt: "desc" },
	});
}

export async function getRecentPrograms() {
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
								// We only want the junction records
								// where the actual exercise is NOT deleted
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

	return recentSessions.map((session) => session.program);
}

export async function saveProgram(formData: FormData) {
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
	const userId = await getUserId();

	await prisma.program.update({
		where: { id, userId },
		data: {
			deletedAt: new Date(),
		},
	});

	revalidatePath(ROUTES.PROGRAMS);
}
