"use server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Program } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { ROUTES } from "@/lib/consts";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

export async function getPrograms(): Promise<Program[]> {
	try {
		const userId = await getUserId();

		return prisma.program.findMany({
			where: {
				userId,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	} catch (e) {
		console.log(e);
		redirect(ROUTES.LOGIN);
	}
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

	revalidatePath("/programs");
}
