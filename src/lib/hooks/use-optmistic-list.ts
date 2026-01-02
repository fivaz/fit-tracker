import { useOptimistic } from "react";

type Identifiable = { id: string };

type Action<T> =
	| { type: "add"; item: T }
	| { type: "update"; item: T }
	| { type: "delete"; id: string }
	| { type: "set"; items: T[] };

interface UseOptimisticListOptions<T> {
	sortFn?: (items: T[]) => T[];
}

/**
 * Manage an optimistic list of identifiable items with add, update, delete, and set actions, applying an optional sort after each update.
 *
 * @param initialItems - The initial items used to seed the optimistic list state.
 * @param options - Optional configuration.
 * @param options.sortFn - A function that receives the updated list and returns a reordered list; invoked after every action when provided.
 * @returns An object containing `optimisticItems`, the current list state, and `dispatch`, a function to apply `add`, `update`, `delete`, or `set` actions to the list.
 */
export function useOptimisticList<T extends Identifiable>(
	initialItems: T[],
	options: UseOptimisticListOptions<T> = {},
) {
	const { sortFn } = options;

	const [optimisticItems, dispatch] = useOptimistic(
		initialItems,
		(state: T[], action: Action<T>): T[] => {
			let newState: T[];

			switch (action.type) {
				case "add":
					newState = [...state, action.item as T];
					break;

				case "update":
					newState = state.map((item) =>
						item.id === action.item.id ? { ...item, ...action.item } : item,
					);
					break;

				case "delete":
					newState = state.filter((item) => item.id !== action.id);
					break;

				case "set":
					newState = action.items;
					break;

				default:
					return state;
			}

			// Apply custom sort function if provided
			return sortFn ? sortFn(newState) : newState;
		},
	);

	return {
		optimisticItems,
		dispatch,
	};
}