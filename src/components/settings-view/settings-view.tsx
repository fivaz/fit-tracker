"use client";

import { useState } from "react";
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

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/generated/prisma/client";
import { authClient } from "@/lib/auth-client";
import { ROUTES } from "@/lib/consts";
import { updateBodyMetrics, updateUserProfile } from "@/lib/user/action";

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

function SettingRow({
	icon: Icon,
	label,
	value,
	onClick,
	isExpanded = false,
	children,
}: {
	icon: JSX.Element;
	label: string;
	value?: string;
	onClick?: () => void;
	isExpanded?: boolean;
	children?: React.ReactNode;
}) {
	return (
		<div
			className={`border-b transition-colors last:border-b-0 ${
				onClick ? "hover:bg-muted/50 cursor-pointer" : ""
			}`}
			onClick={onClick}
		>
			<div className="flex items-center gap-3 px-4 py-3">
				<div className="bg-muted flex h-8 w-8 items-center justify-center rounded-lg">
					<Icon className="text-muted-foreground h-4 w-4" />
				</div>
				<div className="min-w-0 flex-1">
					<div className="text-sm font-medium">{label}</div>
					{value && !isExpanded && <div className="text-muted-foreground text-xs">{value}</div>}
				</div>
				{children}
				{onClick && (
					<ChevronRight
						className={`text-muted-foreground h-5 w-5 transition-transform duration-300 ${
							isExpanded ? "rotate-90" : ""
						}`}
					/>
				)}
			</div>
			{children && isExpanded && (
				<div className="animate-in slide-in-from-top-2 px-4 pt-2 pb-4">{children}</div>
			)}
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
	icon: JSX.Element;
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

	return (
		<div className="border-b last:border-b-0">
			<div
				className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors"
				onClick={() => !isExpanded && setIsExpanded(true)}
			>
				<div className="bg-muted flex h-8 w-8 items-center justify-center rounded-lg">
					<Icon className="text-muted-foreground h-4 w-4" />
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
				<ChevronRight
					className={`text-muted-foreground h-5 w-5 transition-transform duration-300 ${
						isExpanded ? "rotate-90" : ""
					}`}
				/>
			</div>

			{isExpanded && (
				<div className="animate-in slide-in-from-top-2 space-y-3 px-4 pt-2 pb-4">
					<div className="space-y-2">
						<div className="relative">
							<Input
								id={fieldName}
								type={type}
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
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
			)}
		</div>
	);
}

type SettingsViewProps = {
	user: User;
};

export function SettingsView({ user }: SettingsViewProps) {
	const { theme, setTheme } = useTheme();
	const [isPendingSignOut, setIsPendingSignOut] = useState(false);
	const router = useRouter();

	const handleSignOut = async () => {
		setIsPendingSignOut(true);
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					// 1. Clear the client-side cache to ensure all
					// Server Components re-fetch fresh (empty) data
					router.refresh();

					// 2. Immediate redirect to the login page
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

	const getThemeLabel = () => {
		if (theme === "dark") return "Dark";
		if (theme === "light") return "Light";
		return "System";
	};

	return (
		<div className="bg-background min-h-screen">
			{/* Header */}
			<div className="bg-background sticky top-0 z-10 border-b shadow-sm">
				<div className="flex items-center gap-3 p-4">
					<Button variant="ghost" size="icon" onClick={() => router.back()}>
						<ChevronLeft className="h-6 w-6" />
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
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-2xl font-bold text-white">
								{user.name.charAt(0).toUpperCase()}
							</div>
							<Button
								size="icon"
								className="absolute right-0 bottom-0 h-7 w-7 rounded-full shadow-lg"
							>
								<Camera className="h-4 w-4" />
							</Button>
						</div>
						<div className="min-w-0 flex-1">
							<h3 className="truncate text-lg font-semibold">{user.name}</h3>
							<p className="text-muted-foreground truncate text-sm">{user.email}</p>
						</div>
					</div>
				</div>

				{/* Appearance */}
				<SettingSection title="Appearance">
					<SettingRow
						icon={theme === "dark" ? Moon : theme === "light" ? Sun : Monitor}
						label="Theme"
						value={getThemeLabel()}
					>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm">
									{getThemeLabel()}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => setTheme("light")}>
									<Sun className="mr-2 h-4 w-4" />
									Light
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("dark")}>
									<Moon className="mr-2 h-4 w-4" />
									Dark
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("system")}>
									<Monitor className="mr-2 h-4 w-4" />
									System
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SettingRow>
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
					className="group flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 transition-colors hover:bg-red-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-red-950/20"
				>
					<div className="flex size-8 items-center justify-center rounded-lg bg-red-100 transition-colors group-hover:bg-red-200 dark:bg-red-950/50 dark:group-hover:bg-red-950">
						<LogOut className="size-4 text-red-600 dark:text-red-400" />
					</div>
					<span className="text-sm font-medium text-red-600 dark:text-red-400">Sign Out</span>
				</button>

				<div className="text-muted-foreground pb-4 text-center text-xs">Version 1.0.0</div>
			</div>
		</div>
	);
}
