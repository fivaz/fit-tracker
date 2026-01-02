import { MuscleGroup } from "@/generated/prisma/client";
import { ExerciseWithPrograms } from "@/lib/exercise/types";

export type ExerciseOutput = Omit<ExerciseWithPrograms, "image"> & {
	imageFile: File | null;
};

/**
 * Converts FormData into an Exercise object
 * @param formData - The FormData from the form submission
 * @returns Parsed exercise data
 */
export function parseExerciseFormData(formData: FormData): ExerciseOutput {
	const id = formData.get("id")?.toString() || "";
	const name = formData.get("name")?.toString() || "";
	const muscles = formData.getAll("muscles") as MuscleGroup[];
	const programIds = formData.getAll("programIds") as string[];
	const imageFile = formData.get("image") as File | null;

	const programs = programIds.map((pId) => ({
		programId: pId,
	}));

	return {
		id,
		name,
		muscles,
		programs,
		imageFile: imageFile && imageFile?.size > 0 ? imageFile : null,
	};
}
