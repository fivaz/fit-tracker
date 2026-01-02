"use client";

import { useTheme } from "next-themes";

import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	const themes = [
		{ value: "light", icon: Sun, label: "Light" },
		{ value: "dark", icon: Moon, label: "Dark" },
		{ value: "system", icon: Monitor, label: "System" },
	] as const;

	return (
		<div className="bg-muted relative flex rounded-lg p-1">
			<motion.div
				className="bg-primary absolute inset-1 rounded-md shadow-sm"
				layoutId="theme-indicator"
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
				style={{
					left: theme === "light" ? 4 : theme === "dark" ? "33.33%" : "66.66%",
					width: "calc(33.33% - 8px)",
				}}
			/>
			{themes.map(({ value, icon: Icon, label }) => (
				<button
					key={value}
					onClick={() => setTheme(value)}
					className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
						theme === value
							? "text-primary-foreground"
							: "text-muted-foreground hover:text-foreground"
					}`}
				>
					<Icon className="size-4" />
					<span className="hidden sm:inline">{label}</span>
				</button>
			))}
		</div>
	);
}
