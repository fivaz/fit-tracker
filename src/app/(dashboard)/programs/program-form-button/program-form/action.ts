"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth/utils.actions";
import { ROUTES } from "@/lib/consts";

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
