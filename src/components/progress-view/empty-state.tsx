import { ComponentType } from "react";

type EmptyStateProps = {
	icon: ComponentType<{ className?: string }>;
	title: string;
	subtitle: string;
};

export function EmptyState({ icon: Icon, title, subtitle }: EmptyStateProps) {
	return (
		<div className="py-16 text-center">
			<Icon className="mx-auto mb-3 h-12 w-12 text-gray-300 dark:text-gray-700" />
			<p className="font-medium text-gray-600 dark:text-gray-400">{title}</p>
			<p className="mt-1 text-sm text-gray-500 dark:text-gray-600">{subtitle}</p>
		</div>
	);
}
