import { ComponentProps } from "react";
import Link from "next/link";

import { DumbbellIcon, NotebookTabsIcon, TrendingUpIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { ROUTES } from "@/lib/consts";
import { getExercises } from "@/lib/exercise/actions";
import { getPrograms } from "@/lib/program/actions";
import { cn } from "@/lib/utils";

/**
 * Render a styled Card that links to the provided `href` and displays the given children.
 *
 * @param href - The destination URL for the link inside the card.
 * @param className - Optional additional class names appended to the card's base styles.
 * @param children - Content rendered inside the Link within the card.
 * @returns A Card element containing a Next.js Link to `href` that wraps `children`.
 */
export function CardQuickAction({
	href,
	className,
	children,
}: ComponentProps<"div"> & { href: string }) {
	return (
		<Card
			className={cn(
				"p-4 shadow-none transition-all hover:scale-[0.99] hover:bg-gray-50 active:scale-98 dark:hover:bg-gray-800",
				className,
			)}
		>
			<Link href={href}>{children}</Link>
		</Card>
	);
}

export async function QuickActions() {
	const [exercises, programs] = await Promise.all([getExercises(), getPrograms()]);

	return (
		<div className="grid space-y-4">
			<CardQuickAction href={ROUTES.PROGRESS}>
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
						<TrendingUpIcon className="size-5 text-green-500" />
					</div>
					<div className="text-left">
						<div className="font-medium">View Progress</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Track your gains</div>
					</div>
				</div>
			</CardQuickAction>

			<CardQuickAction href={ROUTES.PROGRAMS}>
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
						<NotebookTabsIcon className="size-5 text-blue-500" />
					</div>
					<div className="text-left">
						<div className="font-medium">Manage Programs</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">
							{programs.length} programs
						</div>
					</div>
				</div>
			</CardQuickAction>

			<CardQuickAction href={ROUTES.EXERCISES}>
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
						<DumbbellIcon className="size-5 text-purple-500" />
					</div>
					<div className="text-left">
						<div className="font-medium">Exercise Library</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">
							{exercises.length} exercises
						</div>
					</div>
				</div>
			</CardQuickAction>
		</div>
	);
}