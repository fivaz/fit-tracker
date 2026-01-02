"use client";

import { createOptimisticContext } from "@/lib/hooks/create-optimistic-context";
import { SetLogUI } from "@/lib/set-logs/types";

// Create provider with sort function that maintains sets in order
export const [SetLogsProvider, useSetLogs] = createOptimisticContext<SetLogUI>((items) =>
	items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
);
