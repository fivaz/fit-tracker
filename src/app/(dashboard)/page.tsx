import { redirect } from "next/navigation";

import { Header } from "@/components/home/header/header";
import { QuickActions } from "@/components/home/quick-actions/quick-actions";
import { StartWorkout } from "@/components/home/start-workout/start-workout";
import { ROUTES } from "@/lib/consts";
import { getActiveSessionId } from "@/lib/workout/action";

export default async function Home() {
	const sessionId = await getActiveSessionId();

	// If the user has an active workout, send them straight there
	if (sessionId) {
		redirect(`${ROUTES.WORKOUT}/${sessionId}`);
	}

	return (
		<div className="space-y-8 p-4">
			<Header />
			<StartWorkout />
			<QuickActions />
		</div>
	);
}
