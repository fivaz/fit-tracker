"use client";

import { useState } from "react";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";

import { GoogleIcon } from "@/components/google-icon/google-icon";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth/firebase";
import { loginServer } from "@/lib/auth/utils.actions";
import { ROUTES } from "@/lib/consts";

export default function LoginPage() {
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const provider = new GoogleAuthProvider();

	const handleGoogleSignIn = async () => {
		try {
			setIsLoading(true);
			const result = await signInWithPopup(auth, provider);
			const token = await result.user.getIdToken();

			await loginServer(token, {
				id: result.user.uid,
				email: result.user.email || "error - no email",
				name: result.user.displayName || "error - no name",
			});

			window.location.href = ROUTES.HOME;
		} catch (error) {
			setError(`Error signing in: ${(error as Error).message}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="relative min-h-screen bg-gray-50 dark:bg-gray-950">
			<div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
				<h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Connect with Google</h1>

				{isLoading && <Loader2Icon className="mx-auto h-10 w-10 animate-spin text-blue-500" />}

				{error && (
					<div className="flex items-center gap-3 rounded-md bg-red-50 p-4">
						<TriangleAlertIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
						<p className="text-sm text-red-500 dark:text-red-400">{error}</p>
					</div>
				)}

				<Button onClick={handleGoogleSignIn} className="flex items-center gap-2 px-6 py-3">
					<GoogleIcon />
					Sign in with Google
				</Button>
			</div>
		</div>
	);
}
