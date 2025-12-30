"use client";
import { useEffect } from "react";

export function useWakeLock() {
	useEffect(() => {
		if ("wakeLock" in navigator) {
			const requestWakeLock = async () => {
				try {
					await (navigator as any).wakeLock.request("screen");
				} catch (err) {
					console.error("Wake Lock failed", err);
				}
			};
			void requestWakeLock();
		}
	}, []);
}
