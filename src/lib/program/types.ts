import { Exercise, Program, ProgramHasExercise } from "@/generated/prisma/client";

// Base UI type - excludes database-only fields
export type ProgramUI = Omit<Program, "userId" | "createdAt" | "updatedAt" | "deletedAt">;

export type ProgramSummary = ProgramUI & {
	exerciseCount: number;
};

export type ProgramExerciseRelation = ProgramHasExercise & {
	exercise: Exercise;
};

export function buildEmptyProgram(): ProgramSummary {
	return {
		id: "",
		name: "",
		exerciseCount: 0,
	};
}
