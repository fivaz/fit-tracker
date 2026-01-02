import { MuscleGroup } from "@/generated/prisma/client";
import { ExerciseWithPrograms } from "@/lib/exercise/types";

export type ExerciseOutput = Omit<ExerciseWithPrograms, "image"> & {
	imageFile: File | null;
};

/**
 * Parse a form submission's FormData into an ExerciseOutput object.
 *
 * @param formData - The FormData produced by the exercise form
 * @returns An ExerciseOutput with `id`, `name`, `muscles`, `programs` (array of `{ programId: string }`), and `imageFile` (`File` or `null`). `imageFile` is `null` when no file was provided or the file size is zero.
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