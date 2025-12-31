"use client";

import { ChangeEvent, ComponentType, KeyboardEvent, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import {
	Activity,
	Camera,
	ChevronLeft,
	ChevronRight,
	Dumbbell,
	LogOut,
	Mail,
	Monitor,
	Moon,
	Scale,
	Sun,
	User as UserIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/generated/prisma/client";
import { authClient } from "@/lib/auth-client";
import { ROUTES } from "@/lib/consts";
import { updateBodyMetrics, updateUserProfile, uploadAvatar } from "@/lib/user/action";

// Sub-components
function SettingSection({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="space-y-3">
			<h3 className="text-muted-foreground px-4 text-xs font-semibold tracking-wider uppercase">
				{title}
			</h3>
			<div className="bg-card overflow-hidden rounded-2xl border">{children}</div>
		</div>
	);
}

function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	const themes = [
		{ value: "light", icon: Sun, label: "Light" },
		{ value: "dark", icon: Moon, label: "Dark" },
		{ value: "system", icon: Monitor, label: "System" },
	] as const;

	return (
		<div className="bg-muted relative flex rounded-lg p-1">
			<motion.div
				className="bg-primary absolute inset-1 rounded-md shadow-sm"
				layoutId="theme-indicator"
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
				style={{
					left: theme === "light" ? 4 : theme === "dark" ? "33.33%" : "66.66%",
					width: "calc(33.33% - 8px)",
				}}
			/>
			{themes.map(({ value, icon: Icon, label }) => (
				<button
					key={value}
					onClick={() => setTheme(value)}
					className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
						theme === value
							? "text-primary-foreground"
							: "text-muted-foreground hover:text-foreground"
					}`}
				>
					<Icon className="size-4" />
					<span className="hidden sm:inline">{label}</span>
				</button>
			))}
		</div>
	);
}

function EditableField({
	icon: Icon,
	label,
	value,
	fieldName,
	type = "text",
	unit,
	onSave,
}: {
	icon: ComponentType<{ className?: string }>;
	label: string;
	value: string;
	fieldName: string;
	type?: string;
	unit?: string;
	onSave: (value: string) => Promise<void>;
}) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [inputValue, setInputValue] = useState(value);
	const [isPending, setIsPending] = useState(false);

	const handleSave = async () => {
		setIsPending(true);
		await onSave(inputValue);
		setIsPending(false);
		setIsExpanded(false);
	};

	const handleCancel = () => {
		setInputValue(value);
		setIsExpanded(false);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !isPending) {
			e.preventDefault();
			handleSave();
		}
		if (e.key === "Escape") {
			handleCancel();
		}
	};

	const toggleExpanded = () => {
		if (isExpanded) {
			handleCancel();
		} else {
			setIsExpanded(true);
		}
	};

	return (
		<div className="border-b last:border-b-0">
			<div
				className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors"
				onClick={toggleExpanded}
			>
				<div className="bg-muted flex size-8 items-center justify-center rounded-lg">
					<Icon className="text-muted-foreground size-4" />
				</div>
				<div className="min-w-0 flex-1">
					<div className="text-sm font-medium">{label}</div>
					{!isExpanded && (
						<div className="text-muted-foreground text-xs">
							{value}
							{unit}
						</div>
					)}
				</div>
				<motion.div
					animate={{ rotate: isExpanded ? 90 : 0 }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
				>
					<ChevronRight className="text-muted-foreground size-5" />
				</motion.div>
			</div>

			<AnimatePresence>
				{isExpanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className="overflow-hidden"
					>
						<div className="space-y-3 px-4 pt-2 pb-4" onClick={(e) => e.stopPropagation()}>
							<div className="space-y-2">
								<div className="relative">
									<Input
										id={fieldName}
										type={type}
										value={inputValue}
										onChange={(e) => setInputValue(e.target.value)}
										onKeyDown={handleKeyDown}
										className="pr-12"
										autoFocus
									/>
									{unit && (
										<span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 text-sm">
											{unit}
										</span>
									)}
								</div>
							</div>
							<div className="flex gap-2">
								<Button
									variant="outline"
									onClick={handleCancel}
									disabled={isPending}
									className="flex-1"
								>
									Cancel
								</Button>
								<Button onClick={handleSave} disabled={isPending} className="flex-1">
									{isPending ? "Saving..." : "Save"}
								</Button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

type SettingsViewProps = {
	user: User;
};

export function SettingsView({ user }: SettingsViewProps) {
	const [isPendingSignOut, setIsPendingSignOut] = useState(false);
	const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const handleSignOut = async () => {
		setIsPendingSignOut(true);
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.refresh();
					router.push(ROUTES.LOGIN);
				},
			},
		});
	};

	const handleUpdateProfile = async (field: "name" | "email", value: string) => {
		await updateUserProfile({ [field]: value });
	};

	const handleUpdateMetrics = async (field: "weight" | "bodyFat" | "muscleMass", value: string) => {
		await updateBodyMetrics({ [field]: parseFloat(value) });
	};

	const handleAvatarClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsUploadingAvatar(true);
		try {
			const formData = new FormData();
			formData.append("avatar", file);
			await uploadAvatar(formData);
		} catch (error) {
			console.error("Failed to upload avatar:", error);
		} finally {
			setIsUploadingAvatar(false);
		}
	};

	return (
		<div className="bg-background min-h-screen">
			{/* Header */}
			<div className="bg-background sticky top-0 z-10 border-b shadow-sm">
				<div className="flex items-center gap-3 p-4">
					<Button variant="ghost" size="icon" onClick={() => router.back()}>
						<ChevronLeft className="size-6" />
					</Button>
					<div>
						<h2 className="text-lg font-semibold">Settings</h2>
						<p className="text-muted-foreground text-sm">Manage your preferences</p>
					</div>
				</div>
			</div>

			<div className="space-y-6 p-4">
				{/* Profile Section */}
				<div className="bg-card rounded-2xl border p-6">
					<div className="flex items-center gap-4">
						<div className="relative">
							<button
								onClick={handleAvatarClick}
								disabled={isUploadingAvatar}
								className="group relative"
							>
								{user.image ? (
									<Image
										src={user.image}
										alt={user.name}
										width={80}
										height={80}
										className="h-20 w-20 rounded-full object-cover"
									/>
								) : (
									<div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-2xl font-bold text-white">
										{user.name.charAt(0).toUpperCase()}
									</div>
								)}
								<div className="bg-background absolute inset-0 flex items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-90">
									<Camera className="size-6" />
								</div>
								{isUploadingAvatar && (
									<div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
										<div className="size-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
									</div>
								)}
							</button>
							<input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								onChange={handleFileChange}
								className="hidden"
							/>
						</div>
						<div className="min-w-0 flex-1">
							<h3 className="truncate text-lg font-semibold">{user.name}</h3>
							<p className="text-muted-foreground truncate text-sm">{user.email}</p>
						</div>
					</div>
				</div>

				{/* Appearance */}
				<SettingSection title="Appearance">
					<div className="p-4">
						<ThemeToggle />
					</div>
				</SettingSection>

				{/* Body Metrics */}
				<SettingSection title="Body Metrics">
					<EditableField
						icon={Scale}
						label="Weight"
						value={user.weight?.toString() || "0"}
						fieldName="weight"
						type="number"
						unit="kg"
						onSave={(value) => handleUpdateMetrics("weight", value)}
					/>
					<EditableField
						icon={Activity}
						label="Body Fat"
						value={user.bodyFat?.toString() || "0"}
						fieldName="bodyFat"
						type="number"
						unit="%"
						onSave={(value) => handleUpdateMetrics("bodyFat", value)}
					/>
					<EditableField
						icon={Dumbbell}
						label="Muscle Mass"
						value={user.muscleMass?.toString() || "0"}
						fieldName="muscleMass"
						type="number"
						unit="%"
						onSave={(value) => handleUpdateMetrics("muscleMass", value)}
					/>
				</SettingSection>

				{/* Account */}
				<SettingSection title="Account">
					<EditableField
						icon={UserIcon}
						label="Name"
						value={user.name}
						fieldName="name"
						onSave={(value) => handleUpdateProfile("name", value)}
					/>
					<EditableField
						icon={Mail}
						label="Email"
						value={user.email}
						fieldName="email"
						type="email"
						onSave={(value) => handleUpdateProfile("email", value)}
					/>
				</SettingSection>

				{/* Sign Out */}
				<button
					onClick={handleSignOut}
					disabled={isPendingSignOut}
					className="group flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-red-950/20"
				>
					<div className="flex size-8 items-center justify-center rounded-lg bg-red-100 transition-colors group-hover:bg-red-200 dark:bg-red-950/50 dark:group-hover:bg-red-950">
						<LogOut className="size-4 text-red-600 dark:text-red-400" />
					</div>
					<span className="text-sm font-medium text-red-600 dark:text-red-400">
						{isPendingSignOut ? "Signing out..." : "Sign Out"}
					</span>
				</button>

				<div className="text-muted-foreground pb-4 text-center text-xs">Version 1.0.0</div>
			</div>
		</div>
	);
}
