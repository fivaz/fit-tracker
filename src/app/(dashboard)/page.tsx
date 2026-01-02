import { redirect } from "next/navigation";

import { Header } from "@/components/home/header/header";
import { QuickActions } from "@/components/home/quick-actions/quick-actions";
import { StartWorkout } from "@/components/home/start-workout/start-workout";
import { ROUTES } from "@/lib/consts";
import { getActiveSessionId } from "@/lib/workout/actions";

/**
 * Render the app home page or redirect the user to an active workout session.
 *
 * Retrieves the current active workout session and, if one exists, redirects the user to the workout route for that session. Otherwise renders the home page UI containing Header, StartWorkout, and QuickActions.
 *
 * @returns The home page JSX element; if an active workout session exists, the user is redirected to the workout route instead.
 */
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