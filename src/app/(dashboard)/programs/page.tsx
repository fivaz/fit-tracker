import { AnimatePresence } from "motion/react";

import { getPrograms } from "@/components/program/action";
import { ProgramEmptyState } from "@/components/program/program-empty-state/program-empty-state";
import { ProgramFormButton } from "@/components/program/program-form-button/program-form-button";
import { ProgramRow } from "@/components/program/program-row/program-row";

export default async function ProgramPage() {
	const programs = await getPrograms();

	return (
		<div className="space-y-4 p-4">
			<div className="pt-2 pb-2">
				<h2 className="mb-1 text-xl text-gray-900 dark:text-white">Workout Programs</h2>
				<p className="text-sm text-gray-600 dark:text-gray-400">{programs.length} programs</p>
			</div>

			<ProgramFormButton />

			<div className="space-y-2">
				<AnimatePresence mode="popLayout">
					{programs.map((program) => (
						<ProgramRow key={program.id} program={program} />
					))}
				</AnimatePresence>
			</div>

			{programs.length === 0 && <ProgramEmptyState />}
		</div>
	);
}
