import { useCallback,useOptimistic } from "react";

type Identifiable = { id: string };

type Action<T> =
	| { type: "add"; item: T }
	| { type: "update"; item: Partial<T> & Identifiable }
	| { type: "delete"; id: string }
	| { type: "set"; items: T[] };

export function useOptimisticList<T extends Identifiable>(initialItems: T[]) {
	const [optimisticItems, setOptimisticItems] = useOptimistic(
		initialItems,
		(state: T[], action: Action<T>): T[] => {
			switch (action.type) {
				case "add":
					return [...state, action.item];
				case "update":
					return state.map((item) =>
						item.id === action.item.id ? { ...item, ...action.item } : item
					);
				case "delete":
					return state.filter((item) => item.id !== action.id);
				case "set":
					return action.items;
				default:
					return state;
			}
		}
	);

	const addItem = useCallback(
		(item: T) => {
			setOptimisticItems({ type: "add", item });
		},
		[setOptimisticItems],
	);

	const updateItem = useCallback(
		(item: T) => {
			setOptimisticItems({ type: "update", item });
		},
		[setOptimisticItems],
	);

	const deleteItem = useCallback(
		(id: string) => {
			setOptimisticItems({ type: "delete", id });
		},
		[setOptimisticItems],
	);

	const updateList = useCallback(
		(items: T[]) => {
			setOptimisticItems({ type: "set", items });
		},
		[setOptimisticItems],
	);

	return {
		optimisticItems,
		addItem,
		updateItem,
		deleteItem,
		updateList,
	};
}
