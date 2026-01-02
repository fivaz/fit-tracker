"use client";

import { useState } from "react";

import { format, isValid, parse } from "date-fns";
import { Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLongPress } from "@/lib/hooks/use-long-press";

interface TimeButtonProps {
	time: Date | null;
	onChange: (date: Date | null) => void;
}

export function TimeButton({ time, onChange }: TimeButtonProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [inputValue, setInputValue] = useState(time ? format(time, "HH:mm") : "");

	const handleLongPress = () => setIsEditing(true);
	const longPressHandlers = useLongPress(handleLongPress, 600);

	const processTimeUpdate = (value: string) => {
		if (value.length === 5) {
			const newDate = parse(value, "HH:mm", new Date());
			if (isValid(newDate)) {
				onChange(newDate);
			}
		}
	};

	const handleBlur = () => {
		processTimeUpdate(inputValue);
		setIsEditing(false);
	};

	const handleQuickFinish = () => {
		if (!time) {
			onChange(new Date());
		}
	};

	if (isEditing) {
		return (
			<Input
				autoFocus
				placeholder="06:30"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onBlur={handleBlur}
				onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
				className="h-9 text-center font-mono text-xs"
			/>
		);
	}

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={handleQuickFinish}
			{...longPressHandlers}
			className="h-9 gap-1 px-2 font-mono text-xs select-none"
		>
			{time ? (
				<span className="text-primary font-bold">{format(time, "HH:mm")}</span>
			) : (
				<>
					<Clock className="size-3" /> Finish
				</>
			)}
		</Button>
	);
}
