import { createOptimisticContext } from "../hooks/create-optimistic-context";
import { ProgramSummary } from "./types";

export const [ProgramsProvider, usePrograms] = createOptimisticContext<ProgramSummary>();

// Re-export for convenience
export type { ProgramSummary } from "./types";
