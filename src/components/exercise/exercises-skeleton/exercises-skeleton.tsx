import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Renders a vertical stack of three skeleton placeholders for exercise rows.
 *
 * @returns A JSX element containing three skeleton-stubbed exercise rows.
 */
export function ExercisesSkeleton() {
	return (
		<div className="space-y-2">
			<ExerciseRowSkeleton />
			<ExerciseRowSkeleton />
			<ExerciseRowSkeleton />
		</div>
	);
}

/**
 * Renders a card-styled skeleton placeholder for a single exercise row, including title, subtitle, action icons, and content area.
 *
 * @returns A JSX element containing the skeleton-stubbed exercise row.
 *
 * @internal
 */
function ExerciseRowSkeleton() {
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