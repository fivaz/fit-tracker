import { Exercise } from "@/generated/prisma/client";

// Base UI type - excludes database-only fields
export type ExerciseUI = Omit<Exercise, "userId" | "createdAt" | "updatedAt" | "deletedAt">;

// Exercise form input type (for create/edit forms)
// Can accept partial data for new exercises or full ExerciseWithPrograms for editing
export type ExerciseFormInput = Partial<Pick<ExerciseUI, "id" | "name" | "image" | "muscles">> & {
	programs?: { programId: string }[];
};

// Exercise with programs (for list views)
export type ExerciseWithPrograms = ExerciseUI & {
	programs?: { programId: string }[];
};

// Exercise summary - optimized for list views (no programs list)
export type ExerciseSummary = ExerciseUI & {
	programCount: number;
};
