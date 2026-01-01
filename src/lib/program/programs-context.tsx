import { Program } from "@/generated/prisma/client";
import { createOptimisticContext } from "@/lib/hooks/create-optimistic-context";

export type ProgramWithExercises = Program & { exercises: { exerciseId: string }[] };

export const [ProgramsProvider, usePrograms] = createOptimisticContext<ProgramWithExercises>();
