import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Visual placeholder element that displays a pulsing, rounded skeleton block.
 *
 * @param className - Additional CSS class names to apply to the outer div
 * @param props - Other props forwarded to the underlying div element
 * @returns A div element styled as a pulsing, rounded skeleton placeholder
 */
function Skeleton({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn("bg-accent animate-pulse rounded-md", className)}
			{...props}
		/>
	);
}

export { Skeleton };