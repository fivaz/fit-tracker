import { SetLog } from "@/generated/prisma/client";
// Base UI type - excludes database-only fields
export type SetLogUI = Omit<SetLog, "userId" | "createdAt" | "updatedAt" | "deletedAt">;

export function buildEmptySetLog(setLog: Partial<SetLogUI>): SetLogUI {
	return {
		id: "",
		weight: 0,
		reps: 0,
		completedAt: null,
		exerciseId: "",
		sessionId: "",
		order: 0,
		isPersonalRecord: false,
		...setLog,
	};
}
