"use client";

import { ComponentProps, useState } from "react";

import { FieldLabel } from "@/components/ui/field";
import { MultiSelect } from "@/components/ui/multi-select";
import { MAJOR_MUSCLE_GROUPS } from "@/lib/consts";

type MuscleSelectProps = ComponentProps<"select"> & {
	defaultValue: string[] | undefined;
};

export function MuscleSelect({ name, defaultValue }: MuscleSelectProps) {
	const [selected, setSelected] = useState<string[]>(defaultValue || []);

	const options = MAJOR_MUSCLE_GROUPS.map((muscle) => ({
		value: muscle,
		label: muscle.charAt(0).toUpperCase() + muscle.slice(1),
	}));

	return (
		<>
			<FieldLabel htmlFor="muscle-select">Muscle Group</FieldLabel>

			{selected.map((val) => (
				<input key={val} type="hidden" name={name} value={val} />
			))}

			<MultiSelect
				id="muscle-select"
				name="muscle-select"
				placeholder="Select muscle groups"
				options={options}
				defaultValue={selected}
				onValueChange={setSelected}
			/>
		</>
	);
}
