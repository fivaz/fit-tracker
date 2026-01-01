import { AnimatePresence } from "motion/react";

import { ProgramEmptyState } from "@/components/program/program-empty-state/program-empty-state";
import { ProgramRow } from "@/components/program/program-row/program-row";
import { getPrograms } from "@/lib/program/action";
import { devDelay } from "@/lib/utils";

export async function ProgramsContent() {
	const programs = await getPrograms();
	await devDelay();

	if (programs.length === 0) {
		return <ProgramEmptyState />;
	}

	return (
		<div className="space-y-2">
			<AnimatePresence mode="popLayout">
				{programs.map((program) => (
					<ProgramRow key={program.id} program={program} />
				))}
			</AnimatePresence>
		</div>
	);
}
