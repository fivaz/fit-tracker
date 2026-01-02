import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
