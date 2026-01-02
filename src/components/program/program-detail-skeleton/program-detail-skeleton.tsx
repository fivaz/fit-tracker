import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Renders a skeleton UI for the program detail view.
 *
 * The skeleton includes a full-width top button placeholder and three exercise row placeholders
 * to simulate the page layout while content is loading.
 *
 * @returns A JSX element containing a top form button skeleton and three exercise row skeletons.
 */
export function ProgramDetailSkeleton() {
	return (
		<div className="space-y-4">
			{/* Form Button Skeleton */}
			<Skeleton className="h-10 w-full" />

			{/* Exercise Rows Skeleton */}
			<div className="space-y-4">
				<ExerciseRowSkeleton />
				<ExerciseRowSkeleton />
				<ExerciseRowSkeleton />
			</div>
		</div>
	);
}

/**
 * Renders a Card-shaped skeleton placeholder representing a single exercise row.
 *
 * The skeleton includes a header with title and subtitle placeholders, two action icon placeholders
 * in the top-right, and a full-width content line to represent exercise details.
 *
 * @returns A JSX element containing the exercise row skeleton UI
 */
function ExerciseRowSkeleton() {
	return (
		<Card>
			<CardHeader className="relative">
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