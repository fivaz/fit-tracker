// Centralized mock/seed data used by Storybook and lightweight UI mocks

import { Exercise, Program } from "@/generated/prisma/client";

export const programs = [
	{ id: "1", name: "Push Day", exercises: [1, 2, 3] },
	{ id: "2", name: "Pull Day", exercises: [1, 2] },
	{ id: "3", name: "Leg Day", exercises: [1, 2, 3, 4] },
	{ id: "4", name: "Full Body", exercises: [1, 2, 3, 4, 5] },
];

export const mockProgram: Program & { exercises: [] } = {
	id: "p1",
	name: "Push Day",
	userId: "u1",
	createdAt: new Date(),
	updatedAt: new Date(),
	deletedAt: null,
	exercises: [],
	// The Prisma generated Program type includes relation fields which we can omit by casting
};

export const mockExercise: Exercise = {
	id: "e1",
	name: "Bench Press",
	muscle: "Chest",
	userId: "u1",
	createdAt: new Date(),
	updatedAt: new Date(),
	deletedAt: null,
	image: null,
};
