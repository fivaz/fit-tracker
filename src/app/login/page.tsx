"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/auth/firebase";
import { GoogleIcon } from "@/components/google-icon/google-icon";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ROUTES } from "@/lib/consts";
import { loginServer } from "@/lib/auth/utils.actions";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";

export default function LoginPage() {
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const provider = new GoogleAuthProvider();

	const handleGoogleSignIn = async () => {
		try {
			setIsLoading(true);
			const result = await signInWithPopup(auth, provider);
			const token = await result.user.getIdToken();

			await loginServer(token);

			window.location.href = ROUTES.HOME;
		} catch (error) {
			setError(`Error signing in: ${(error as Error).message}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mx-auto max-w-md">
			{isLoading && <Loader2Icon className="mx-auto size-10 w-auto animate-spin text-blue-500" />}
			{error && (
				<div className="flex items-center gap-3 rounded-md bg-red-50 p-4">
					<div className="shrink-0">
						<TriangleAlertIcon aria-hidden="true" className="size-5 text-red-400" />
					</div>
					<p className="text-center text-sm/6 text-red-500 dark:text-red-400">{error}</p>
				</div>
			)}
			<Button onClick={handleGoogleSignIn}>
				<GoogleIcon />
			</Button>
		</div>
	);
}
