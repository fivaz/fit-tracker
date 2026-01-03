import { ProgressView } from "@/components/progress-view/progress-view";
import { getExercises } from "@/lib/exercise/actions";
import { getSessionsWithSetLogsForProgress } from "@/lib/set-logs/actions";

export default async function ProgressPage() {
	const [sessions, exercises] = await Promise.all([
		getSessionsWithSetLogsForProgress(),
		getExercises(),
	]);

	return <ProgressView exercises={exercises} sessions={sessions} />;
}
