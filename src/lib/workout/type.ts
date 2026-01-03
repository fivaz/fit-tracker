import { WorkoutSession } from "@/generated/prisma/client";
// Base UI type - excludes database-only fields
export type WorkoutSessionUI = Omit<
	WorkoutSession,
	"userId" | "createdAt" | "updatedAt" | "deletedAt"
>;

export type ProgressSetLog = {
	id: string;
	weight: number;
	reps: number;
	completedAt: Date | null;
	exerciseId: string;
};

export type ProgressWorkoutSession = {
	id: string;
	startedAt: Date;
	completedAt: Date | null;
	setLogs: ProgressSetLog[];
};
