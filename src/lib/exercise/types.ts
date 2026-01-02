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
