"use client";

import { Dumbbell, Folder, TrendingUp } from "lucide-react";

type QuickActionsProps = {};

export function QuickActions({}: QuickActionsProps) {
	return (
		<div className="space-y-3">
			<button className="flex w-full items-center justify-between rounded-xl border border-gray-800 bg-gray-900 p-4 transition-colors hover:bg-gray-800 active:scale-[0.98]">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
						<TrendingUp className="h-5 w-5 text-green-500" />
					</div>
					<div className="text-left">
						<div className="font-medium">View Progress</div>
						<div className="text-sm text-gray-400">Track your gains</div>
					</div>
				</div>
			</button>

			<button className="flex w-full items-center justify-between rounded-xl border border-gray-800 bg-gray-900 p-4 transition-colors hover:bg-gray-800 active:scale-[0.98]">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
						<Folder className="h-5 w-5 text-blue-500" />
					</div>
					<div className="text-left">
						<div className="font-medium">Manage Programs</div>
						<div className="text-sm text-gray-400">2 programs</div>
					</div>
				</div>
			</button>

			<button className="flex w-full items-center justify-between rounded-xl border border-gray-800 bg-gray-900 p-4 transition-colors hover:bg-gray-800 active:scale-[0.98]">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
						<Dumbbell className="h-5 w-5 text-purple-500" />
					</div>
					<div className="text-left">
						<div className="font-medium">Exercise Library</div>
						<div className="text-sm text-gray-400">2 exercises</div>
					</div>
				</div>
			</button>
		</div>
	);
}
