"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Program } from "@/generated/prisma/client";
import { getUser } from "@/lib/auth/utils.actions";
import { ROUTES } from "@/lib/consts";
import { prisma } from "@/lib/prisma";

export async function getPrograms(): Promise<Program[]> {
	const user = await getUser();

	if (!user) {
		redirect(ROUTES.LOGIN);
	}

	return prisma.program.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
}

export async function saveProgram(formData: FormData) {
	const user = await getUser();
	if (!user) throw new Error("Unauthorized");

	const id = formData.get("id")?.toString();
	const name = formData.get("name")?.toString();

	if (!name) throw new Error("Name is required");

	if (id) {
		// Update Logic
		await prisma.program.update({
			where: { id, userId: user.id },
			data: { name },
		});
	} else {
		// Create Logic
		await prisma.program.create({
			data: { name, userId: user.id },
		});
	}

	revalidatePath(ROUTES.PROGRAMS);
}

export async function deleteProgramAction(id: string) {
	const user = await getUser();
	if (!user) throw new Error("Unauthorized");

	await prisma.program.update({
		where: { id, userId: user.id },
		data: {
			deletedAt: new Date(),
		},
	});

	revalidatePath("/programs");
}
