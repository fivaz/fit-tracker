import { Header } from "@/components/home/header/header";
import { QuickActions } from "@/components/home/quick-actions/quick-actions";
import { StartWorkout } from "@/components/home/start-workout/start-workout";

export default function Home() {
	return (
		<div className="space-y-4 p-4">
			<Header />

			<StartWorkout />

			<QuickActions />
		</div>
	);
}
