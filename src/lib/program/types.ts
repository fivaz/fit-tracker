import { Exercise, Program, ProgramHasExercise } from "@/generated/prisma/client";

// Base UI type - excludes database-only fields
export type ProgramUI = Omit<Program, "userId" | "createdAt" | "updatedAt" | "deletedAt">;

export type ProgramSummary = ProgramUI & {
	exerciseCount: number;
};

export type ProgramExerciseRelation = ProgramHasExercise & {
	exercise: Exercise;
};

/**
 * Create a ProgramSummary populated with default empty values.
 *
 * @returns A ProgramSummary with `id` and `name` as empty strings and `exerciseCount` set to 0
 */
export function buildEmptyProgram(): ProgramSummary {
	return {
		id: "",
		name: "",
		exerciseCount: 0,
	};
}