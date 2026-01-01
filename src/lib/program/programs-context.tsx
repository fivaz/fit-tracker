import { createOptimisticContext } from "@/lib/hooks/create-optimistic-context";
import { ProgramWithExercises } from "./types";

export const [ProgramsProvider, usePrograms] = createOptimisticContext<ProgramWithExercises>();

// Re-export for convenience
export type { ProgramWithExercises } from "./types";
