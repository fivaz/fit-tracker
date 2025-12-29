"use server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth/utils.actions";
import { ROUTES } from "@/lib/consts";

export async function createProgram(formData: FormData) {
	const user = await getUser();

	if (!user) {
		redirect(ROUTES.LOGIN);
	}

	const name = formData.get("name")?.toString();

	if (!name) throw new Error("Name is required");

	await prisma.program.create({
		data: { name, userId: user.id },
	});

	redirect(ROUTES.PROGRAMS);
}
