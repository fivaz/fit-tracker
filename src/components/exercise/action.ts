"use server";
import { cache } from "react";
import { revalidatePath } from "next/cache";

import { v4 as uuidv4 } from "uuid";

import { Exercise } from "@/generated/prisma/client";
import { ROUTES } from "@/lib/consts";
import { prisma } from "@/lib/prisma";
import { getPublicImageUrl, uploadFile } from "@/lib/supabase";
import { getUserId } from "@/lib/utils-server";

export const getExerciseById = cache(async (id: string) => {
	try {
		const userId = await getUserId();

		const exercise = await prisma.exercise.findUnique({
			where: { id, userId, deletedAt: null },
		});

		if (!exercise) {
			return null;
		}

		return exercise;
	} catch (error) {
		console.error("Error fetching exercise:", error);
		return null;
	}
});

export async function getExercises(programId: string): Promise<Exercise[]> {
	const userId = await getUserId();

	// Find exercises linked to the program via the join table
	const phe = await prisma.programHasExercise.findMany({
		where: { programId },
		include: { exercise: true },
		orderBy: { order: "asc" },
	});

	return phe
		.map((p) => p.exercise)
		.filter((e) => e && e.userId === userId && e.deletedAt === null) as Exercise[];
}

async function uploadImage(imageFile: File | null, userId: string) {
	if (!imageFile || !(imageFile.size > 0)) {
		return null;
	}

	// Validate file type
	if (!imageFile.type.startsWith("image/")) {
		throw new Error("Only image files are allowed");
	}

	// Validate file size (max 5MB)
	const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
	if (imageFile.size > MAX_IMAGE_SIZE) {
		throw new Error("Image must be smaller than 5MB");
	}

	const fileExtension = imageFile.name.split(".").pop();
	const imagePath = `${userId}/${uuidv4()}.${fileExtension}`;

	await uploadFile(imageFile, "exercise-images", imagePath);

	return getPublicImageUrl("exercise-images", imagePath);
}

export async function saveExercise(formData: FormData) {
	const userId = await getUserId();

	const id = formData.get("id")?.toString();
	const programId = formData.get("programId")?.toString();
	const name = formData.get("name")?.toString();
	const muscle = formData.get("muscle")?.toString();
	const imageFile = formData.get("image") as File | null;

	if (!name || !muscle || !programId) {
		throw new Error("Name, muscle or program are required");
	}

	const imageUrl = await uploadImage(imageFile, userId);

	const exerciseData = {
		name,
		muscle,
		userId,
		...(imageUrl && { image: imageUrl }),
	};

	if (id) {
		await prisma.exercise.update({
			where: { id, userId },
			data: exerciseData,
		});
	} else {
		await prisma.exercise.create({
			data: {
				...exerciseData,
				programs: {
					create: {
						programId,
					},
				},
			},
		});
	}

	revalidatePath(`${ROUTES.PROGRAMS}/${programId}`);
}

export async function deleteExerciseAction(id: string) {
	const userId = await getUserId();

	await prisma.exercise.update({
		where: { id, userId },
		data: {
			deletedAt: new Date(),
		},
	});

	revalidatePath(ROUTES.EXERCISES);
}
