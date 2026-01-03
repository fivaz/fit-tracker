import { ProgressView } from "@/components/progress-view/progress-view";
import { getExercises } from "@/lib/exercise/actions";
import { prisma } from "@/lib/prisma";
import { getSessionsWithSetLogs } from "@/lib/set-logs/actions";
import { getUserId } from "@/lib/utils-server";

export default async function ProgressPage() {
	const sessions = await getSessionsWithSetLogs();

	const exercises = await getExercises();

	return <ProgressView exercises={exercises} sessions={sessions} />;
}
