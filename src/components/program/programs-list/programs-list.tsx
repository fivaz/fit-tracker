"use client";

import { AnimatePresence } from "motion/react";

import { ProgramEmptyState } from "@/components/program/program-empty-state/program-empty-state";
import { ProgramFormButton } from "@/components/program/program-form-button/program-form-button";
import { ProgramRow } from "@/components/program/program-row/program-row";
import { ProgramsProvider, ProgramSummary, usePrograms } from "@/lib/program/programs-context";

type ProgramsListProps = {
	initialPrograms: ProgramSummary[];
};

/**
 * Renders a programs list UI wrapped with a ProgramsProvider initialized with provided items.
 *
 * @param initialPrograms - Initial array of program summaries used to populate the provider
 * @returns A React element that provides programs context and displays a form button plus the programs list
 */
export function ProgramsList({ initialPrograms }: ProgramsListProps) {
	return (
		<ProgramsProvider initialItems={initialPrograms}>
			<div className="space-y-4">
				<ProgramFormButton />
				<ProgramsListInternal />
			</div>
		</ProgramsProvider>
	);
}

/**
 * Render the current programs from the Programs context, showing an empty state when none exist.
 *
 * Reads the programs array from the Programs context via `usePrograms()` and either renders
 * `ProgramEmptyState` when the array is empty or a list of `ProgramRow` items wrapped in
 * `AnimatePresence` for animated layout transitions.
 *
 * @returns A React element containing `ProgramEmptyState` if there are no programs, or a vertically
 * stacked list of `ProgramRow` components wrapped in `AnimatePresence` otherwise.
 */
function ProgramsListInternal() {
	const { items: programs } = usePrograms();

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