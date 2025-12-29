"use client";

import React from "react";
import Link from "next/link";

import { Play } from "lucide-react";

type StartWorkoutProps = {};

const programs = [
	{ id: "1", name: "Push Day", exercises: [1, 2, 3] },
	{ id: "2", name: "Pull Day", exercises: [1, 2] },
	{ id: "3", name: "Leg Day", exercises: [1, 2, 3, 4] },
	{ id: "4", name: "Full Body", exercises: [1, 2, 3, 4, 5] },
];

export function StartWorkout({}: StartWorkoutProps) {
	return (
		<div className="rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 p-5 shadow-lg">
			<div className="mb-3 flex items-center gap-2">
				<Play className="h-5 w-5 text-white" />
				<h2 className="text-lg text-white">Start Workout</h2>
			</div>
			{programs.length > 0 ? (
				<div className="space-y-2">
					{programs.slice(0, 3).map((program) => (
						<button
							key={program.id}
							className="flex w-full items-center justify-between rounded-xl bg-white/10 p-4 text-left text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
						>
							<div>
								<div className="font-medium">{program.name}</div>
								<div className="text-sm text-blue-100">{program.exercises.length} exercises</div>
							</div>
							<Play className="h-5 w-5" />
						</button>
					))}
					{programs.length > 3 && (
						<Link href="/programs">
							<div className="w-full p-3 text-center text-sm text-blue-200 transition-colors hover:text-white">
								View all programs →
							</div>
						</Link>
					)}
				</div>
			) : (
				<div className="py-6 text-center">
					<p className="mb-3 text-sm text-blue-100">No programs yet</p>
					<Link
						href="/programs"
						className="rounded-lg bg-white/20 px-4 py-2 text-sm text-white transition-colors hover:bg-white/30"
					>
						Create your first program
					</Link>
				</div>
			)}
		</div>
	);
}
