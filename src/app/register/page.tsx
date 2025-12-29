"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";
import { ROUTES } from "@/lib/consts";

export default function SignUp() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
		setImagePreview(null);
	};

	const handleSubmit = async () => {
		if (password !== passwordConfirmation) {
			toast.error("Passwords do not match");
			return;
		}

		setLoading(true);

		try {
			await signUp.email({
				email,
				password,
				name: `${firstName.trim()} ${lastName.trim()}`,
				image: image ? await convertImageToBase64(image) : undefined,
				callbackURL: ROUTES.HOME,
				fetchOptions: {
					onRequest: () => setLoading(true),
					onResponse: () => setLoading(false),
					onError: (ctx) => {
						toast.error(ctx.error.message);
						setLoading(false);
					},
					onSuccess: () => {
						toast.success("Account created successfully!");
						router.push(ROUTES.HOME);
					},
				},
			});
		} catch (error) {
			console.log(error);
			// Fallback in case something goes wrong
			toast.error("Something went wrong. Please try again.");
			setLoading(false);
		}
	};

	return (
		<Card className="z-50 max-w-md rounded-md rounded-t-none">
			<CardHeader>
				<CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
				<CardDescription className="text-xs md:text-sm">
					Enter your information to create an account
				</CardDescription>
			</CardHeader>

			<CardContent className="grid gap-6">
				<div className="grid grid-cols-2 gap-4">
					<div className="grid gap-2">
						<Label htmlFor="first-name">First name</Label>
						<Input
							id="first-name"
							placeholder="Max"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="last-name">Last name</Label>
						<Input
							id="last-name"
							placeholder="Robinson"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</div>
				</div>

				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						placeholder="m@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className="grid gap-2">
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						type="password"
						placeholder="••••••••"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="new-password"
						required
					/>
				</div>

				<div className="grid gap-2">
					<Label htmlFor="password-confirmation">Confirm Password</Label>
					<Input
						id="password-confirmation"
						type="password"
						placeholder="••••••••"
						value={passwordConfirmation}
						onChange={(e) => setPasswordConfirmation(e.target.value)}
						autoComplete="new-password"
						required
					/>
				</div>

				<div className="grid gap-2">
					<Label htmlFor="image">Profile Image (optional)</Label>
					<div className="flex items-center gap-4">
						<Avatar className="h-20 w-20">
							<AvatarImage src={imagePreview || undefined} />
							<AvatarFallback className="text-lg">
								{firstName && lastName ? `${firstName[0]}${lastName[0]}`.toUpperCase() : "?"}
							</AvatarFallback>
						</Avatar>

						<div className="flex flex-1 items-center gap-2">
							<Input
								id="image"
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								className="flex-1"
							/>
							{imagePreview && (
								<Button
									type="button"
									variant="ghost"
									size="icon"
									onClick={handleRemoveImage}
									className="shrink-0"
								>
									<X className="h-4 w-4" />
								</Button>
							)}
						</div>
					</div>
				</div>

				<Button onClick={handleSubmit} disabled={loading} className="w-full">
					{loading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Creating account...
						</>
					) : (
						"Create an account"
					)}
				</Button>
			</CardContent>

			<CardFooter>
				<div className="flex w-full flex-col items-center gap-2 border-t pt-6">
					<p className="text-muted-foreground text-sm">
						Already have an account?{" "}
						<Link
							href={ROUTES.LOGIN}
							className="font-medium text-blue-600 hover:underline dark:text-blue-400"
						>
							Sign in
						</Link>
					</p>
				</div>
			</CardFooter>
		</Card>
	);
}

async function convertImageToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}
