"use client";

import { AnimatePresence } from "motion/react";

import { ProgramEmptyState } from "@/components/program/program-empty-state/program-empty-state";
import { ProgramFormButton } from "@/components/program/program-form-button/program-form-button";
import { ProgramRow } from "@/components/program/program-row/program-row";
import {
	ProgramsProvider,
	ProgramWithExercises,
	usePrograms,
} from "@/lib/program/programs-context";

type ProgramsListProps = {
	initialPrograms: ProgramWithExercises[];
};

export function ProgramsList({ initialPrograms }: ProgramsListProps) {
	return (
		<ProgramsProvider initialPrograms={initialPrograms}>
			<div className="space-y-4">
				<ProgramFormButton />
				<ProgramsListInternal />
			</div>
		</ProgramsProvider>
	);
}

function ProgramsListInternal() {
	const { programs } = usePrograms();

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
