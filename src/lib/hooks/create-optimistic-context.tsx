"use client";

import { createContext, ReactNode, useContext } from "react";

import { useOptimisticList } from "@/lib/hooks/use-optmistic-list";

type Identifiable = { id: string };

interface OptimisticContextProps<T> {
	items: T[];
	addItem: (item: T) => void;
	updateItem: (item: T) => void;
	deleteItem: (id: string) => void;
	setItems: (items: T[]) => void;
}

export function createOptimisticContext<T extends Identifiable>() {
	const Context = createContext<OptimisticContextProps<T> | null>(null);

	function Provider({ children, initialItems }: { children: ReactNode; initialItems: T[] }) {
		const { optimisticItems, dispatch } = useOptimisticList<T>(initialItems);

		const value: OptimisticContextProps<T> = {
			items: optimisticItems,
			addItem: (item) => dispatch({ type: "add", item }),
			updateItem: (item) => dispatch({ type: "update", item }),
			deleteItem: (id) => dispatch({ type: "delete", id }),
			setItems: (items) => dispatch({ type: "set", items }),
		};

		return <Context.Provider value={value}>{children}</Context.Provider>;
	}

	function useOptimisticContext() {
		const context = useContext(Context);
		if (!context) throw new Error("useOptimisticContext must be used within its Provider");
		return context;
	}

	return [Provider, useOptimisticContext] as const;
}
