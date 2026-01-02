import { createOptimisticContext } from "../hooks/create-optimistic-context";
import { ExerciseWithPrograms } from "./types";

export const [ExercisesProvider, useExercises] = createOptimisticContext<ExerciseWithPrograms>();
