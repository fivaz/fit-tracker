"use server";
import { revalidatePath } from "next/cache";

import { ROUTES } from "@/lib/consts";
import { parseExerciseFormData } from "@/lib/exercise/exercise-form-data";
import { ExerciseWithPrograms } from "@/lib/exercise/types";
import { uploadImage } from "@/lib/image-upload";
import { prisma } from "@/lib/prisma";
import { devDelay } from "@/lib/utils";
import { getUserId } from "@/lib/utils-server";

/**
 * Fetches the current user's exercises that are not deleted, including associated program IDs, ordered by creation date descending.
 *
 * @returns An array of exercises, each containing `id`, `name`, `image`, `muscles`, and the associated program IDs
 */
export async function getExercises(): Promise<ExerciseWithPrograms[]> {
	await devDelay();

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

/**
 * Get the number of exercises belonging to the current user that are not deleted.
 *
 * @returns The count of exercises for the current user with `deletedAt` equal to `null`.
 */
export async function getExercisesCount() {
	const userId = await getUserId();

	return prisma.exercise.count({
		where: { userId, deletedAt: null },
	});
}

/**
 * Create or update an exercise from submitted form data, including optional image upload, program associations, and route revalidation.
 *
 * Parses the provided FormData for exercise fields; uploads an image if present; creates a new exercise or updates an existing one (replacing its program associations); and revalidates affected program and exercises routes.
 *
 * @param formData - Form data containing exercise fields parsed by `parseExerciseFormData` (may include `id`, `name`, `muscles`, `programs`, and an optional image file)
 */
export async function saveExercise(formData: FormData) {
	await devDelay();

	const userId = await getUserId();

	const { id, name, muscles, programs, imageFile } = parseExerciseFormData(formData);

	const imageUrl = await uploadImage(imageFile || null, userId, "exercise-images");

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
						create: programs,
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
					create: programs,
				},
			},
		});
	}

	programs.forEach(({ programId }) => {
		revalidatePath(`${ROUTES.PROGRAMS}/${programId}`);
	});

	revalidatePath(ROUTES.EXERCISES);
}

/**
 * Soft-delete the specified exercise for the current user and revalidate the exercises route.
 *
 * Marks the exercise as deleted by setting its `deletedAt` timestamp and triggers cache revalidation for the exercises list.
 *
 * @param id - The ID of the exercise to soft-delete
 */
export async function deleteExerciseAction(id: string) {
	await devDelay();

	const userId = await getUserId();

	await prisma.exercise.update({
		where: { id, userId },
		data: {
			deletedAt: new Date(),
		},
	});

	revalidatePath(ROUTES.EXERCISES);
}