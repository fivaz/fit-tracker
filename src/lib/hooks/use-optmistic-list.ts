import { useOptimistic } from "react";

type Identifiable = { id: string };

type Action<T> =
	| { type: "add"; item: Partial<T> & Identifiable }
	| { type: "update"; item: Partial<T> & Identifiable }
	| { type: "delete"; id: string }
	| { type: "set"; items: T[] };

export function useOptimisticList<T extends Identifiable>(initialItems: T[]) {
	const [optimisticItems, dispatch] = useOptimistic(
		initialItems,
		(state: T[], action: Action<T>): T[] => {
			switch (action.type) {
				case "add":
					// We cast the partial item to T so the rest of the app
					// sees a "complete" object, even if it's missing some DB-only fields.
					return [...state, action.item as T];

				case "update":
					return state.map((item) =>
						item.id === action.item.id ? { ...item, ...action.item } : item,
					);

				case "delete":
					return state.filter((item) => item.id !== action.id);

				case "set":
					return action.items;

				default:
					return state;
			}
		},
	);

	return {
		optimisticItems,
		dispatch,
	};
}
