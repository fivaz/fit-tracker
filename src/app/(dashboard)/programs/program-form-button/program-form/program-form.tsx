import { motion } from "motion/react";
import { X } from "lucide-react";
import { Program } from "@/generated/prisma/client";
import { saveProgram } from "./action";

type ProgramFormProps = {
	program?: Program; // If present, we are editing
	onClose: () => void;
};

export function ProgramForm({ program, onClose }: ProgramFormProps) {
	return (
		<motion.form
			initial={{ opacity: 0, height: 0, scale: 0.95 }}
			animate={{ opacity: 1, height: "auto", scale: 1 }}
			exit={{ opacity: 0, height: 0, scale: 0.95 }}
			transition={{ duration: 0.2 }}
			action={async (formData) => {
				await saveProgram(formData);
				onClose();
			}}
			className="relative space-y-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
		>
			<div className="mb-2 flex items-center justify-between">
				<h3 className="text-lg font-semibold">{program ? "Edit Program" : "New Program"}</h3>
				<button type="button" onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
					<X className="h-5 w-5" />
				</button>
			</div>

			{/* Hidden ID field for the server action to know if it's an update */}
			{program && <input type="hidden" name="id" value={program.id} />}

			<div>
				<label className="mb-2 block text-sm font-semibold text-gray-600 dark:text-gray-400">
					Program Name *
				</label>
				<input
					type="text"
					name="name"
					defaultValue={program?.name}
					placeholder="e.g., Push Day"
					required
					className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
				/>
			</div>

			<div className="flex gap-3 pt-2">
				<button
					type="submit"
					className="flex-1 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
				>
					{program ? "Save Changes" : "Create Program"}
				</button>
				<button
					type="button"
					onClick={onClose}
					className="rounded-xl bg-gray-200 px-6 py-3 text-gray-900 dark:bg-gray-800 dark:text-white"
				>
					Cancel
				</button>
			</div>
		</motion.form>
	);
}
