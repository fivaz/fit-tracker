"use client";
import { ComponentProps } from "react";
import Link from "next/link";

import { Dumbbell, Folder, TrendingUp } from "lucide-react";

import { ROUTES } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { mockExercises, mockWorkoutSessions } from "@/seed/mock-data";

const programs = [0, 2];
const exercises = [0, 2];

export function CardQuickAction({
	href,
	className,
	children,
}: ComponentProps<"div"> & { href: string }) {
	return (
		<div
			className={cn(
				"rounded-xl border border-gray-200 bg-white p-4 transition-all hover:scale-[0.99] hover:bg-gray-50 active:scale-98 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800",
				className,
			)}
		>
			<Link href={href}>{children}</Link>
		</div>
	);
}

export function QuickActions() {
	return (
		<div className="grid space-y-3">
			<div className="grid grid-cols-2 gap-3">
				<CardQuickAction href={ROUTES.PROGRAMS}>
					<div className="space-y-1">
						<div className="text-2xl">{mockWorkoutSessions.filter((s) => s.completed).length}</div>
						<div className="text-muted-foreground">Workouts</div>
					</div>
				</CardQuickAction>
				<CardQuickAction href={ROUTES.EXERCISES}>
					<div className="space-y-1 px-4">
						<div className="text-2xl">{mockExercises.length}</div>
						<div className="text-muted-foreground">Exercises</div>
					</div>
				</CardQuickAction>
			</div>

			<CardQuickAction href={ROUTES.PROGRESS}>
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
						<TrendingUp className="size-5 text-green-500" />
					</div>
					<div className="text-left">
						<div className="font-medium">View Progress</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Track your gains</div>
					</div>
				</div>
			</CardQuickAction>

			<CardQuickAction href={ROUTES.PROGRAMS}>
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
						<Folder className="size-5 text-orange-500" />
					</div>
					<div className="text-left">
						<div className="font-medium">Manage Programs</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">
							{programs.length} programs
						</div>
					</div>
				</div>
			</CardQuickAction>

			<CardQuickAction href={ROUTES.EXERCISES}>
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
						<Dumbbell className="size-5 text-purple-500" />
					</div>
					<div className="text-left">
						<div className="font-medium">Exercise Library</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">
							{exercises.length} exercises
						</div>
					</div>
				</div>
			</CardQuickAction>
		</div>
	);
}
