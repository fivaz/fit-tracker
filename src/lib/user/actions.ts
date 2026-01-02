"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/lib/consts";
import { uploadImage } from "@/lib/image-upload";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

export async function getUser() {
	const userId = await getUserId();

	return prisma.user.findUnique({
		where: {
			id: userId,
		},
	});
}

export async function updateUserProfile(data: { name?: string; email?: string }) {
	const userId = await getUserId();

	await prisma.user.update({
		where: { id: userId },
		data,
	});

	revalidatePath(ROUTES.SETTINGS);
}

export async function updateBodyMetrics(data: {
	weight?: number;
	fatPercentage?: number;
	musclePercentage?: number;
}) {
	const userId = await getUserId();

	await prisma.user.update({
		where: { id: userId },
		data,
	});

	revalidatePath(ROUTES.SETTINGS);
}

export async function uploadAvatar(formData: FormData) {
	const userId = await getUserId();

	const imageFile = formData.get("avatar") as File | null;

	// Upload to Supabase Storage
	const publicUrl = await uploadImage(imageFile, userId, "avatars");

	if (!publicUrl) {
		return null;
	}

	// Update user's image in database
	await prisma.user.update({
		where: { id: userId },
		data: { image: publicUrl },
	});

	revalidatePath(ROUTES.SETTINGS);

	return { success: true, url: publicUrl };
}
