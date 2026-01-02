import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Renders a vertical stack of three program row skeletons with consistent spacing.
 *
 * @returns A JSX element containing three ProgramRowSkeleton placeholders arranged vertically with uniform gaps.
 */
export function ProgramsSkeleton() {
	return (
		<div className="space-y-2">
			<ProgramRowSkeleton />
			<ProgramRowSkeleton />
			<ProgramRowSkeleton />
		</div>
	);
}

/**
 * Renders a skeleton placeholder for a single program row inside a card.
 *
 * The rendered card includes header placeholders for a title, a subtitle, and two
 * square action icons positioned at the top-right, plus a full-width content line
 * representing the program details area.
 *
 * @returns A JSX element representing the program row skeleton
 */
function ProgramRowSkeleton() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-6 w-48" />
				<Skeleton className="mt-2 h-4 w-32" />
				<div className="absolute top-4 right-4 flex space-x-2">
					<Skeleton className="h-8 w-8 rounded-md" />
					<Skeleton className="h-8 w-8 rounded-md" />
				</div>
			</CardHeader>
			<CardContent>
				<Skeleton className="h-10 w-full" />
			</CardContent>
		</Card>
	);
}