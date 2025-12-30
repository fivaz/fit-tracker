import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="container mx-auto space-y-8 px-4 py-10">
			<div className="mx-auto max-w-3xl space-y-4">
				<Skeleton className="h-10 w-2/3" />
				<Skeleton className="h-6 w-full" />
				<div className="space-y-2 pt-10">
					<Skeleton className="h-8 w-32" />
					<Skeleton className="h-20 w-full" />
					<Skeleton className="h-20 w-full" />
				</div>
			</div>
		</div>
	);
}
