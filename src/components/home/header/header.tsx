"use client";

import { Dumbbell, Play } from "lucide-react";
import React from "react";

type HeaderProps = {};

export function Header({}: HeaderProps) {
	return (
		<div className="pt-2 pb-4">
			<div className="mb-1 flex items-center gap-2">
				<Dumbbell className="h-6 w-6 text-blue-500" />
				<h1 className="text-xl font-bold">FitTracker</h1>
			</div>
			<p className="text-sm text-gray-400">Track your fitness journey</p>
		</div>
	);
}
