"use client";

import { createOptimisticContext } from "@/lib/hooks/create-optimistic-context";
import { SetLogUI } from "@/lib/set-logs/types";

// We export the Provider and the Hook specific to SetLogs
export const [SetLogsProvider, useSetLogs] = createOptimisticContext<SetLogUI>();
