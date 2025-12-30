"use server";
import { cache } from "react";
import { revalidatePath } from "next/cache";

import { v4 as uuidv4 } from "uuid";

import { Exercise } from "@/generated/prisma/client";
import { ROUTES } from "@/lib/consts";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { getUserId } from "@/lib/utils-server";

export const getExerciseById = cache(async (id: string) => {
	try {
		const userId = await getUserId();

		const exercise = await prisma.exercise.findUnique({
			where: { id, userId },
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

	return prisma.exercise.findMany({
		where: {
			programId,
			userId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
}

async function uploadFileToSupabase(file: File, bucket: string, path: string) {
	const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
		cacheControl: "3600",
		upsert: true,
	});

	if (error) {
		throw new Error(`Image upload failed: ${error.message}`);
	}

	return data;
}

function getPublicImageUrl(bucket: string, path: string): string {
	const { data } = supabase.storage.from(bucket).getPublicUrl(path);
	return data.publicUrl;
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

	let imageUrl: string | undefined;

	if (imageFile && imageFile.size > 0) {
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

		await uploadFileToSupabase(imageFile, "exercise-images", imagePath);

		imageUrl = getPublicImageUrl("exercise-images", imagePath);
	}

	const exerciseData = {
		name,
		muscle,
		userId,
		programId,
		...(imageUrl && { image: imageUrl }),
	};

	if (id) {
		await prisma.exercise.update({
			where: { id, userId },
			data: exerciseData,
		});
	} else {
		await prisma.exercise.create({
			data: exerciseData,
		});
	}

	revalidatePath(ROUTES.EXERCISES);
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
