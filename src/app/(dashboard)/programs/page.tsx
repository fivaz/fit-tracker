import { Suspense } from "react";

import { ProgramsList } from "@/components/program/programs-list/programs-list";
import { ProgramsSkeleton } from "@/components/program/programs-skeleton/programs-skeleton";
import { getPrograms } from "@/lib/program/actions";

/**
 * Renders the "Workout Programs" page layout with a header and Suspense-wrapped program count and list.
 *
 * The header shows the page title and a Suspense boundary that loads the program count with a small
 * loading fallback. The main content area contains a Suspense boundary that loads the program list
 * and shows a ProgramsSkeleton while the list is loading.
 *
 * @returns The page's React element containing the header, a Suspense-wrapped program count, and a Suspense-wrapped program list.
 */
export default function ProgramsPage() {
	return (
		<div className="space-y-4 p-4">
			<div className="pt-2 pb-2">
				<h1 className="mb-1 text-xl tracking-tight">Workout Programs</h1>
				<Suspense fallback={<div className="text-primary text-sm">Loading...</div>}>
					<ProgramsCount />
				</Suspense>
			</div>

			<Suspense fallback={<ProgramsSkeleton />}>
				<ProgramsContent />
			</Suspense>
		</div>
	);
}

/**
 * Renders a paragraph showing the total number of workout programs with correct pluralization.
 *
 * @returns A paragraph JSX element displaying the total programs count, using "program" when the count is 1 and "programs" otherwise.
 */
async function ProgramsCount() {
	const { getProgramsCount } = await import("@/lib/program/actions");
	const count = await getProgramsCount();

	return (
		<p className="text-primary text-sm">
			{count} program{count !== 1 && "s"}
		</p>
	);
}

/**
 * Fetches the list of programs and renders a ProgramsList initialized with them.
 *
 * @returns A React element that renders `ProgramsList` with the fetched programs passed as `initialPrograms`.
 */
async function ProgramsContent() {
	const programs = await getPrograms();

	return <ProgramsList initialPrograms={programs} />;
}