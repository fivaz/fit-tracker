import { createOptimisticContext } from "../hooks/create-optimistic-context";
import { ExerciseSummary } from "./types";

export const [ExercisesProvider, useExercises] = createOptimisticContext<ExerciseSummary>();

// Re-export for convenience
export type { ExerciseSummary } from "./types";
