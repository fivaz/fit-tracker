"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Folder, Dumbbell, TrendingUp } from "lucide-react";

type AppLayout2Props = {
	children: ReactNode;
};

export function AppLayout({ children }: AppLayout2Props) {
	const pathname = usePathname();

	const navItems = [
		{ id: "home", icon: Home, label: "Home", href: "/" },
		{ id: "programs", icon: Folder, label: "Programs", href: "/programs" },
		{ id: "exercises", icon: Dumbbell, label: "Exercises", href: "/exercises" },
		{ id: "progress", icon: TrendingUp, label: "Progress", href: "/progress" },
	];

	return (
		<>
			{children}

			{/* Persistent Bottom Navigation */}
			<nav className="safe-area-bottom border-gray-200dark:border-gray-800 back drop-blur-md fixed right-0 bottom-0 left-0 z-50 border-t bg-white dark:bg-gray-900/80">
				<div className="mx-auto flex max-w-md items-center justify-around py-3">
					{navItems.map((item) => {
						const isActive = pathname === item.href;

						return (
							<Link
								key={item.id}
								href={item.href}
								className={`flex flex-col items-center gap-1 px-4 transition-all active:scale-90 ${
									isActive ? "text-blue-500" : "text-gray-600 hover:text-gray-200 dark:text-gray-400"
								}`}
							>
								<item.icon className={`h-6 w-6 ${isActive ? "fill-blue-500/10" : ""}`} />
								<span className="text-xs font-semibold">{item.label}</span>
							</Link>
						);
					})}
				</div>
			</nav>
		</>
	);
}
