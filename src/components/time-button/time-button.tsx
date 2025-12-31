import { useState } from "react";

import { format, parse } from "date-fns";
import { Clock, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLongPress } from "@/lib/hooks/use-long-press";

export function TimeButton({
	time,
	onTimeChange,
}: {
	time: Date | null;
	onTimeChange: (date: Date) => void;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const displayTime = time ? format(time, "HH:mm") : "";

	const handleLongPress = () => setIsEditing(true);
	const longPressHandlers = useLongPress(handleLongPress, 600);

	const handleTimeInput = (value: string) => {
		setInputValue(value);
		if (value.length === 5) {
			try {
				const newDate = parse(value, "HH:mm", new Date());
				if (!isNaN(newDate.getTime())) onTimeChange(newDate);
			} catch {}
		}
	};

	const handleBlur = () => {
		if (inputValue.length === 5) {
			const newDate = parse(inputValue, "HH:mm", new Date());
			if (!isNaN(newDate.getTime())) onTimeChange(newDate);
		}
		setIsEditing(false);
	};

	if (isEditing) {
		return (
			<Input
				autoFocus
				value={inputValue}
				onChange={(e) => handleTimeInput(e.target.value)}
				onBlur={handleBlur}
				className="h-9 text-center font-mono text-xs"
			/>
		);
	}

	return (
		<Button
			variant="outline"
			size="sm"
			{...longPressHandlers}
			onClick={() => !isEditing && onTimeChange(new Date())}
			className="h-9 gap-1 px-2 font-mono text-xs select-none"
		>
			{time ? (
				<span className="text-primary font-bold">{displayTime}</span>
			) : (
				<>
					<Clock className="size-3" /> Finish
				</>
			)}
		</Button>
	);
}
