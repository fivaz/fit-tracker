import { Program } from "@/generated/prisma/client";

// Base UI type - excludes database-only fields
export type ProgramUI = Omit<Program, "userId" | "createdAt" | "updatedAt" | "deletedAt">;

// Program with exercises (for list views and context)
export type ProgramWithExercises = ProgramUI & {
	exercises: { exerciseId: string }[];
};

export function buildEmptyProgram(): ProgramWithExercises {
	return {
		id: "",
		name: "",
		exercises: [],
	};
}

