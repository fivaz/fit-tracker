import React from "react";
import Link from "next/link";

import { Play } from "lucide-react";

import { ROUTES } from "@/lib/consts";
import { getRecentPrograms } from "@/lib/program/actions";

export async function StartWorkout() {
	const programs = await getRecentPrograms();

	return (
		<div className="rounded-2xl bg-linear-to-br from-orange-600 to-orange-700 p-5 shadow-lg">
			<div className="mb-3 flex items-center gap-2">
				<Play className="size-5 text-white" />
				<h2 className="text-lg text-white">Start Workout</h2>
			</div>
			{programs.length > 0 ? (
				<div className="space-y-2">
					{programs.map((program) => (
						<Link key={program.id} href={`${ROUTES.PROGRAMS}/${program.id}`}>
							<div className="flex w-full items-center justify-between rounded-xl bg-white/10 p-4 text-left text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95">
								<div>
									<div className="font-medium">{program.name}</div>
									<div className="text-sm text-orange-100">
										{program.exerciseCount ?? 0} exercises
									</div>
								</div>
								<Play className="size-5" />
							</div>
						</Link>
					))}
					<Link href={ROUTES.PROGRAMS}>
						<div className="w-full p-3 text-center text-sm text-orange-200 transition-colors hover:text-white">
							View all programs →
						</div>
					</Link>
				</div>
			) : (
				<div className="py-6 text-center">
					<p className="mb-3 text-sm text-orange-100">No programs yet</p>
					<Link
						href={ROUTES.PROGRAMS}
						className="rounded-lg bg-white/20 px-4 py-2 text-sm text-white transition-colors hover:bg-white/30"
					>
						Create your first program
					</Link>
				</div>
			)}
		</div>
	);
}
