import { useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

export function ProgressHeader() {
	const router = useRouter();

	return (
		<div className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
			<div className="flex items-center gap-3 p-4">
				<button
					onClick={() => router.back()}
					className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
				>
					<ChevronLeft className="size-6" />
				</button>
				<div>
					<h2 className="text-lg font-semibold">Progress Tracking</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400">View your fitness journey</p>
				</div>
			</div>
		</div>
	);
}
