"use server";

import { revalidatePath } from "next/cache";

import { v4 as uuidv4 } from "uuid";

import { ROUTES } from "@/lib/consts";
import { prisma } from "@/lib/prisma";
import { getPublicImageUrl, uploadFile } from "@/lib/supabase";
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

	const imageFile = formData.get("avatar") as File;

	if (!imageFile || !(imageFile.size > 0)) {
		return null;
	}

	if (!imageFile.type.startsWith("image/")) {
		throw new Error("Only image files are allowed");
	}

	// Validate file size (max 5MB)
	const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
	if (imageFile.size > MAX_IMAGE_SIZE) {
		throw new Error("Image must be smaller than 5MB");
	}

	// Generate unique filename
	const fileExtension = imageFile.name.split(".").pop();
	const imagePath = `${userId}/${uuidv4()}.${fileExtension}`;

	// Upload to Supabase Storage
	await uploadFile(imageFile, "avatars", imagePath);

	// Get public URL
	const publicUrl = getPublicImageUrl("avatars", imagePath);

	// Update user's image in database
	await prisma.user.update({
		where: { id: userId },
		data: { image: publicUrl },
	});

	revalidatePath(ROUTES.SETTINGS);

	return { success: true, url: publicUrl };
}
