"use server";
import { revalidatePath } from "next/cache";

import { v4 as uuidv4 } from "uuid";

import { MuscleGroup } from "@/generated/prisma/client";
import { ROUTES } from "@/lib/consts";
import { ExerciseWithPrograms } from "@/lib/exercise/types";
import { prisma } from "@/lib/prisma";
import { getPublicImageUrl, uploadFile } from "@/lib/supabase";
import { getUserId } from "@/lib/utils-server";

export async function getExercises(): Promise<ExerciseWithPrograms[]> {
	const userId = await getUserId();

	return prisma.exercise.findMany({
		where: {
			userId,
			deletedAt: null,
		},
		select: {
			id: true,
			name: true,
			image: true,
			muscles: true,
			programs: {
				where: { program: { deletedAt: null } },
				select: { programId: true },
			},
		},
		orderBy: { createdAt: "desc" },
	});
}

export async function getExercisesCount() {
	const userId = await getUserId();

	return prisma.exercise.count({
		where: { userId, deletedAt: null },
	});
}

//TODO remove duplicate with avatar upload
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
	const name = formData.get("name")?.toString();
	const muscles = formData.getAll("muscles") as MuscleGroup[];
	const programIds = formData.getAll("programIds") as string[];
	const imageFile = formData.get("image") as File | null;

	if (!name) {
		throw new Error("Please provide a name for the exercise.");
	}

	if (!muscles || muscles.length === 0) {
		throw new Error("Please provide a muscle for the exercise.");
	}

	const imageUrl = await uploadImage(imageFile, userId);

	const data = {
		name,
		muscles,
		userId,
		...(imageUrl && { image: imageUrl }),
	};

	if (id) {
		// UPDATE LOGIC
		await prisma.$transaction(async (tx) => {
			await tx.exercise.update({
				where: { id, userId },
				data: {
					...data,
					// Syncing programs: Clear old ones and add new selection
					programs: {
						deleteMany: {}, // Remove all previous program associations
						create: programIds.map((pId) => ({
							programId: pId,
						})),
					},
				},
			});
		});
	} else {
		// CREATE LOGIC
		await prisma.exercise.create({
			data: {
				...data,
				programs: {
					create: programIds.map((pId) => ({
						programId: pId,
					})),
				},
			},
		});
	}

	programIds.forEach((id) => {
		revalidatePath(`${ROUTES.PROGRAMS}/${id}`);
	});

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
