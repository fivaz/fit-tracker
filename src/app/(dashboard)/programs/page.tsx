import { AnimatePresence } from "motion/react";

import { ProgramEmptyState } from "@/app/(dashboard)/programs/program-empty-state/program-empty-state";
import { getPrograms } from "@/app/(dashboard)/programs/program-form-button/program-form/action";
import { ProgramFormButton } from "@/app/(dashboard)/programs/program-form-button/program-form-button";
import { ProgramRow } from "@/app/(dashboard)/programs/program-row/program-row";

export default async function ProgramPage() {
	const programs = await getPrograms();

	return (
		<div className="space-y-4 p-4">
			<div className="pt-2 pb-2">
				<h2 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">Workout Programs</h2>
				<p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
					{programs.length} programs
				</p>
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
