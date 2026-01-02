import { Program } from "@/generated/prisma/client";

// Base UI type - excludes database-only fields
export type ProgramUI = Omit<Program, "userId" | "createdAt" | "updatedAt" | "deletedAt">;

export type ProgramSummary = ProgramUI & {
	exerciseCount: number;
};

export function buildEmptyProgram(): ProgramSummary {
	return {
		id: "",
		name: "",
		exerciseCount: 0,
	};
}
