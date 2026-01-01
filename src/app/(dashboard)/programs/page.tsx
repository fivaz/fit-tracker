import { Suspense } from "react";

import { ProgramFormButton } from "@/components/program/program-form-button/program-form-button";
import { ProgramsContent } from "@/components/program/programs-content/programs-content";
import { ProgramsSkeleton } from "@/components/program/programs-skeleton/programs-skeleton";

export default function ProgramsPage() {
	return (
		<div className="space-y-4 p-4">
			<div className="pt-2 pb-2">
				<h1 className="mb-1 text-xl tracking-tight">Workout Programs</h1>
				<Suspense fallback={<div className="text-primary text-sm">Loading...</div>}>
					<ProgramsCount />
				</Suspense>
			</div>

			<ProgramFormButton />

			<Suspense fallback={<ProgramsSkeleton />}>
				<ProgramsContent />
			</Suspense>
		</div>
	);
}

async function ProgramsCount() {
	const { getProgramsCount } = await import("@/components/program/action");
	const count = await getProgramsCount();

	return (
		<p className="text-primary text-sm">
			{count} program{count !== 1 && "s"}
		</p>
	);
}
