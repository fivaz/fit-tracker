import { Exercise } from "@/generated/prisma/client";
// Base UI type - excludes database-only fields
export type ExerciseUI = Omit<Exercise, "userId" | "createdAt" | "updatedAt" | "deletedAt">;

// Exercise with programs (for list views)
export type ExerciseWithPrograms = ExerciseUI & {
	programs: { programId: string }[];
};

// Exercise summary - optimized for list views (no programs list)
export type ExerciseSummary = ExerciseUI & {
	programCount: number;
};

/**
 * Create a new ExerciseWithPrograms object populated with sensible defaults, with any provided fields overriding those defaults.
 *
 * @param exercise - Partial fields to merge into the default exercise object
 * @returns An ExerciseWithPrograms object where `id`, `name`, and `image` are empty strings and `muscles` and `programs` are empty arrays unless overridden by `exercise`
 */
export function buildEmptyExercise(exercise: Partial<ExerciseWithPrograms>): ExerciseWithPrograms {
	return {
		id: "",
		name: "",
		image: "",
		muscles: [],
		programs: [],
		...exercise,
	};
}