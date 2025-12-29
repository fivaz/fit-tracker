"use client";

import Link from "next/link";

import { Dumbbell, Folder, TrendingUp } from "lucide-react";

type QuickActionsProps = {};

const programs = [0, 2];
const exercises = [0, 2];

export function QuickActions({}: QuickActionsProps) {
	return (
		<div className="space-y-3">
			{/* Progress */}
			<div className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition-all hover:scale-[0.99] hover:bg-gray-50 active:scale-98 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800">
				<Link href="/src/app/(dashboard)/progress">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
							<TrendingUp className="h-5 w-5 text-green-500" />
						</div>
						<div className="text-left">
							<div className="font-medium">View Progress</div>
							<div className="text-sm text-gray-600 dark:text-gray-400">Track your gains</div>
						</div>
					</div>
				</Link>
			</div>

			{/* Programs */}
			<div className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition-all hover:scale-[0.99] hover:bg-gray-50 active:scale-98 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800">
				<Link href="/programs">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
							<Folder className="h-5 w-5 text-blue-500" />
						</div>
						<div className="text-left">
							<div className="font-medium">Manage Programs</div>
							<div className="text-sm text-gray-600 dark:text-gray-400">{programs.length} programs</div>
						</div>
					</div>
				</Link>
			</div>

			{/* Exercises */}
			<div className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition-all hover:scale-[0.99] hover:bg-gray-50 active:scale-98 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800">
				<Link href="/src/app/(dashboard)/exercises">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
							<Dumbbell className="h-5 w-5 text-purple-500" />
						</div>
						<div className="text-left">
							<div className="font-medium">Exercise Library</div>
							<div className="text-sm text-gray-600 dark:text-gray-400">{exercises.length} exercises</div>
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
}
