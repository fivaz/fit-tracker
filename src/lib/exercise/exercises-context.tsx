import { createOptimisticContext } from "../hooks/create-optimistic-context";
import { ExerciseWithPrograms } from "./types";

// Create provider with sort function that shows newest exercises first (prepend behavior)
export const [ExercisesProvider, useExercises] = createOptimisticContext<ExerciseWithPrograms>(
	(items) => items, // Keeps order as-is (newest added first)
);
