"use client";

import { createContext, ReactNode,useContext } from "react";

import { Program } from "@/generated/prisma/client";
import { useOptimisticList } from "@/lib/hooks/use-optmistic-list";

// Define the shape of our Program with relations
export type ProgramWithExercises = Program & { exercises: { exerciseId: string }[] };

type ProgramsContextType = {
	programs: ProgramWithExercises[];
	addProgram: (program: ProgramWithExercises) => void;
	updateProgram: (program: ProgramWithExercises) => void;
	deleteProgram: (id: string) => void;
	reorderPrograms: (programs: ProgramWithExercises[]) => void;
};

const ProgramsContext = createContext<ProgramsContextType | null>(null);

export function ProgramsProvider({
																	 children,
																	 initialPrograms,
																 }: {
	children: ReactNode;
	initialPrograms: ProgramWithExercises[];
}) {
	const {
		optimisticItems: programs,
		addItem: addProgram,
		updateItem: updateProgram,
		deleteItem: deleteProgram,
		updateList: reorderPrograms
	} = useOptimisticList<ProgramWithExercises>(initialPrograms);

	return (
		<ProgramsContext.Provider
			value={{
				programs,
				addProgram,
				updateProgram,
				deleteProgram,
				reorderPrograms,
			}}
		>
			{children}
		</ProgramsContext.Provider>
	);
}

// Hook to consume the context easily
export function usePrograms() {
	const context = useContext(ProgramsContext);
	if (!context) {
		throw new Error("usePrograms must be used within a ProgramsProvider");
	}
	return context;
}