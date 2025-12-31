import { useRef } from "react";

export function useLongPress(onLongPress: () => void, delay = 600) {
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const start = () => {
		timerRef.current = setTimeout(onLongPress, delay);
	};

	const cancel = () => {
		if (timerRef.current) clearTimeout(timerRef.current);
	};

	return {
		onMouseDown: start,
		onMouseUp: cancel,
		onMouseLeave: cancel,
		onTouchStart: start,
		onTouchEnd: cancel,
	};
}
