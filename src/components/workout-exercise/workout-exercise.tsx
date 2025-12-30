"use client";

import { Exercise } from "@/generated/prisma/client";

type WorkoutExerciseProps = {
	exercise: Exercise;
};

export function WorkoutExercise({ exercise }: WorkoutExerciseProps) {
	return <div>{exercise.name}</div>;
}
