"use client";

import { ComponentProps, FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { GalleryVerticalEnd, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { GithubIcon } from "@/components/icons/github-icon";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { ROUTES } from "@/lib/consts";
import { cn } from "@/lib/utils";

export default function LoginForm({ className, ...props }: ComponentProps<"div">) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(true);
	const [loading, setLoading] = useState(false);
	const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);
	const router = useRouter();

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await authClient.signIn.email({
				email,
				password,
				rememberMe,
				callbackURL: ROUTES.HOME,
				fetchOptions: {
					onResponse: () => setLoading(false),
					onError: (ctx) => {
						toast.error(ctx.error.message);
					},
					onSuccess: () => {
						toast.success("Welcome back!");
						router.push(ROUTES.HOME);
					},
				},
			});
		} catch (error) {
			console.error(error);
			toast.error("An unexpected error occurred.");
			setLoading(false);
		}
	};

	const handleSocialLogin = async (provider: "google" | "github") => {
		setSocialLoading(provider);
		try {
			await authClient.signIn.social({
				provider,
				callbackURL: ROUTES.HOME,
			});
		} catch (error) {
			console.error(error);
			toast.error(`${provider} login failed.`);
			setSocialLoading(null);
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<form onSubmit={handleLogin}>
				<FieldGroup>
					<div className="flex flex-col items-center gap-2 text-center">
						<Link href="/" className="flex flex-col items-center gap-2 font-medium">
							<div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
								<GalleryVerticalEnd className="size-6" />
							</div>
							<span className="sr-only">Acme Inc.</span>
						</Link>
						<h1 className="text-xl font-bold">Welcome back</h1>
						<FieldDescription>
							Don&apos;t have an account?{" "}
							<Link href={ROUTES.REGISTER} className="underline underline-offset-4">
								Sign up
							</Link>
						</FieldDescription>
					</div>

					<Field>
						<FieldLabel htmlFor="email">Email</FieldLabel>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</Field>

					<Field>
						<div className="flex items-center justify-between">
							<FieldLabel htmlFor="password">Password</FieldLabel>
							<Link href="#" className="text-muted-foreground text-xs hover:underline">
								Forgot password?
							</Link>
						</div>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</Field>

					<div className="flex items-center space-x-2">
						<Checkbox
							id="remember"
							checked={rememberMe}
							onCheckedChange={(checked) => setRememberMe(!!checked)}
						/>
						<label htmlFor="remember" className="cursor-pointer text-sm leading-none font-medium">
							Remember me
						</label>
					</div>

					<Field>
						<Button type="submit" className="w-full" disabled={loading || !!socialLoading}>
							{loading ? <Loader2 className="size-4 animate-spin" /> : "Login"}
						</Button>
					</Field>

					<FieldSeparator>Or continue with</FieldSeparator>

					<Field className="grid gap-4 sm:grid-cols-2">
						<Button
							variant="outline"
							type="button"
							disabled={loading || !!socialLoading}
							onClick={() => handleSocialLogin("github")}
						>
							{socialLoading === "github" ? (
								<Loader2 className="size-4 animate-spin" />
							) : (
								<>
									<GithubIcon className="size-6" />
									GitHub
								</>
							)}
						</Button>
						<Button
							variant="outline"
							type="button"
							disabled={loading || !!socialLoading}
							onClick={() => handleSocialLogin("google")}
						>
							{socialLoading === "google" ? (
								<Loader2 className="size-4 animate-spin" />
							) : (
								<>
									<GoogleIcon className="mr-0.5 size-5" />
									Google
								</>
							)}
						</Button>
					</Field>
				</FieldGroup>
			</form>
		</div>
	);
}
