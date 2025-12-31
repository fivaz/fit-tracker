import { ComponentType, KeyboardEvent, useState } from "react";

import {
	ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type EditableFieldProps = {
	icon: ComponentType<{ className?: string }>;
	label: string;
	value: string;
	fieldName: string;
	type?: string;
	unit?: string;
	onSave: (value: string) => Promise<void>;
};

export function EditableField({
	icon: Icon,
	label,
	value,
	fieldName,
	type = "text",
	unit,
	onSave,
}: EditableFieldProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [inputValue, setInputValue] = useState(value);
	const [isPending, setIsPending] = useState(false);

	const handleSave = async () => {
		setIsPending(true);
		await onSave(inputValue);
		setIsPending(false);
		setIsExpanded(false);
	};

	const handleCancel = () => {
		setInputValue(value);
		setIsExpanded(false);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !isPending) {
			e.preventDefault();
			handleSave();
		}
		if (e.key === "Escape") {
			handleCancel();
		}
	};

	const toggleExpanded = () => {
		if (isExpanded) {
			handleCancel();
		} else {
			setIsExpanded(true);
		}
	};

	return (
		<div className="border-b last:border-b-0">
			<div
				className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors"
				onClick={toggleExpanded}
			>
				<div className="bg-muted flex size-8 items-center justify-center rounded-lg">
					<Icon className="text-muted-foreground size-4" />
				</div>
				<div className="min-w-0 flex-1">
					<div className="text-sm font-medium">{label}</div>
					{!isExpanded && (
						<div className="text-muted-foreground text-xs">
							{value}
							{unit}
						</div>
					)}
				</div>
				<motion.div
					animate={{ rotate: isExpanded ? 90 : 0 }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
				>
					<ChevronRight className="text-muted-foreground size-5" />
				</motion.div>
			</div>

			<AnimatePresence>
				{isExpanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className="overflow-hidden"
					>
						<div className="space-y-3 px-4 pt-2 pb-4" onClick={(e) => e.stopPropagation()}>
							<div className="space-y-2">
								<div className="relative">
									<Input
										id={fieldName}
										type={type}
										value={inputValue}
										onChange={(e) => setInputValue(e.target.value)}
										onKeyDown={handleKeyDown}
										className="pr-12"
										autoFocus
									/>
									{unit && (
										<span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 text-sm">
											{unit}
										</span>
									)}
								</div>
							</div>
							<div className="flex gap-2">
								<Button
									variant="outline"
									onClick={handleCancel}
									disabled={isPending}
									className="flex-1"
								>
									Cancel
								</Button>
								<Button onClick={handleSave} disabled={isPending} className="flex-1">
									{isPending ? "Saving..." : "Save"}
								</Button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
