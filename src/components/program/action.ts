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
			// // You can include relations here if needed
			// include: {
			// 	exercises: true,
			// },
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

export async function getPrograms(): Promise<Program[]> {
	const userId = await getUserId();

	return prisma.program.findMany({
		where: {
			userId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
}

export async function saveProgram(formData: FormData) {
	const userId = await getUserId();

	const id = formData.get("id")?.toString();
	const name = formData.get("name")?.toString();

	if (!name) throw new Error("Name is required");

	if (id) {
		// Update Logic
		await prisma.program.update({
			where: { id, userId },
			data: { name },
		});
	} else {
		// Create Logic
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
