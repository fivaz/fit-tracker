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

/**
 * Creates a typed React context and provider pair for managing an optimistic list of identifiable items.
 *
 * @template T - Item type extending `{ id: string }`
 * @param defaultSortFn - Optional default sort function applied to items when a Provider is mounted and no `sortFn` prop is supplied.
 * @returns A readonly tuple [Provider, useOptimisticContext] where:
 *  - `Provider` is a React component that accepts `{ children, initialItems, sortFn? }` and supplies an optimistic list context.
 *  - `useOptimisticContext` is a hook that returns the context value with `items` and mutation helpers: `addItem(item)`, `updateItem(item)`, `deleteItem(id)`, and `setItems(items)`.
 */
export function createOptimisticContext<T extends Identifiable>(
	defaultSortFn?: (items: T[]) => T[],
) {
	const Context = createContext<OptimisticContextProps<T> | null>(null);

	function Provider({
		children,
		initialItems,
		sortFn = defaultSortFn,
	}: {
		children: ReactNode;
		initialItems: T[];
		sortFn?: (items: T[]) => T[];
	}) {
		const { optimisticItems, dispatch } = useOptimisticList<T>(initialItems, {
			sortFn,
		});

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