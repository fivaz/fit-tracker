// Centralized mock/seed data used by Storybook and lightweight UI mocks

import { Exercise, Program } from "@/generated/prisma/client";
import { ProgramSummary } from "@/lib/program/types";

export const mockUser = {
	id: "user-123-abc",
	name: "Alex Rivera",
	email: "alex.fit@example.com",
	image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",

	// Body Metrics
	weight: 82.5, // kg
	bodyFat: 18.2, // %
	muscleMass: 42.0, // %

	activeSessionId: null, // No workout currently in progress
	emailVerified: true,
	createdAt: new Date("2025-01-01T10:00:00Z"),
	updatedAt: new Date("2025-12-30T15:30:00Z"),
};

export const mockPrograms = [
	{ id: "1", name: "Push Day", exercises: [1, 2, 3] },
	{ id: "2", name: "Pull Day", exercises: [1, 2] },
	{ id: "3", name: "Leg Day", exercises: [1, 2, 3, 4] },
	{ id: "4", name: "Full Body", exercises: [1, 2, 3, 4, 5] },
];

export const mockExercises = [
	{ id: "1", name: "Bench Press" },
	{ id: "2", name: "Squat" },
];

export const mockWorkoutSessions = [{ completed: true }, { completed: true }];

export const mockProgram: ProgramSummary = {
	id: "p1",
	name: "Push Day",
	exerciseCount: 3,
	// The Prisma generated Program type includes relation fields which we can omit by casting
};

export const mockExercise: Exercise = {
	id: "e1",
	name: "Bench Press",
	muscles: ["chest"],
	userId: "u1",
	createdAt: new Date(),
	updatedAt: new Date(),
	deletedAt: null,
	image: null,
};
