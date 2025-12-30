"use client";

import { ComponentProps, useMemo, useState } from "react";

import useSWR from "swr"; // pnpm add swr

import { FieldLabel } from "@/components/ui/field";
import { MultiSelect } from "@/components/ui/multi-select";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a skeleton loader

// Basic fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

type ProgramSelectProps = ComponentProps<"select"> & {
	defaultValue: string[] | undefined;
};

export function ProgramSelect({ name, defaultValue }: ProgramSelectProps) {
	const [selected, setSelected] = useState<string[]>(defaultValue || []);

	// 1. Fetch programs from your API route
	const {
		data: programs,
		error,
		isLoading,
	} = useSWR<{ id: string; name: string }[]>("/api/programs", fetcher);

	// 2. Build options dynamically once data arrives
	const options = useMemo(() => {
		if (!programs) return [];
		return programs.map((program) => ({
			value: program.id,
			label: program.name,
		}));
	}, [programs]);

	if (error) return <div className="text-destructive text-xs">Failed to load programs</div>;

	return (
		<>
			<FieldLabel htmlFor="program-select">Programs</FieldLabel>

			{/* Maintain the hidden inputs for the Server Action */}
			{selected.map((val) => (
				<input key={val} type="hidden" name={name} value={val} />
			))}

			{isLoading ? (
				<Skeleton className="h-10 w-full" />
			) : (
				<MultiSelect
					id="program-select"
					name="program-select-ui"
					placeholder="Select programs"
					options={options}
					defaultValue={selected}
					onValueChange={setSelected}
				/>
			)}
		</>
	);
}
