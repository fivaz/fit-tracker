import React from "react";

import { Dumbbell } from "lucide-react";

export function Header() {
	return (
		<div className="flex items-center justify-between">
			<div>
				<div className="mb-1 flex items-center gap-2">
					<Dumbbell className="text-chart-2 size-6" />
					<h1 className="text-xl">FitTracker</h1>
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">Track your fitness journey</p>
			</div>
		</div>
	);
}
