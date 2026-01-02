"use server";
import { revalidatePath } from "next/cache";

import { ROUTES } from "@/lib/consts";
import { parseExerciseFormData } from "@/lib/exercise/exercise-form-data";
import { ExerciseWithPrograms } from "@/lib/exercise/types";
import { uploadImage } from "@/lib/image-upload";
import { prisma } from "@/lib/prisma";
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

export async function saveExercise(formData: FormData) {
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
