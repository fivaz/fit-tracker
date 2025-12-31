import { ProgressView } from "@/components/progress-view/progress-view";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

export default async function ProgressPage() {
	const userId = await getUserId();
	// In your page component
	const sessions = await prisma.workoutSession.findMany({
		where: { userId },
		include: { setLogs: true },
		orderBy: { startedAt: "asc" },
	});

	const exercises = await prisma.exercise.findMany({
		where: { userId },
	});

	return <ProgressView exercises={exercises} sessions={sessions} />;
}
