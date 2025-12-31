"use client";
import { useState } from "react";

import {
	Activity,
	Camera,
	ChevronLeft,
	ChevronRight,
	Dumbbell,
	LogOut,
	Mail,
	Moon,
	Scale,
	Sun,
	User,
} from "lucide-react";

// Sub-components
function SettingSection({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="space-y-3">
			<h3 className="px-4 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
				{title}
			</h3>
			<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
				{children}
			</div>
		</div>
	);
}

function SettingRow({
	icon: Icon,
	label,
	value,
	onClick,
	showChevron = false,
	children,
}: {
	icon: any;
	label: string;
	value?: string;
	onClick?: () => void;
	showChevron?: boolean;
	children?: React.ReactNode;
}) {
	return (
		<div
			className={`flex items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0 dark:border-gray-800 ${
				onClick ? "cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50" : ""
			}`}
			onClick={onClick}
		>
			<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
				<Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
			</div>
			<div className="min-w-0 flex-1">
				<div className="text-sm font-medium">{label}</div>
				{value && <div className="text-xs text-gray-500 dark:text-gray-400">{value}</div>}
			</div>
			{children}
			{showChevron && <ChevronRight className="h-5 w-5 text-gray-400" />}
		</div>
	);
}

function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
	return (
		<button
			onClick={onToggle}
			className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-200 transition-colors dark:bg-gray-700"
		>
			<span
				className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform dark:bg-gray-900 ${
					isDark ? "translate-x-7" : "translate-x-1"
				}`}
			>
				{isDark ? (
					<Moon className="m-1 h-4 w-4 text-blue-500" />
				) : (
					<Sun className="m-1 h-4 w-4 text-orange-500" />
				)}
			</span>
		</button>
	);
}

function InputModal({
	isOpen,
	onClose,
	title,
	value,
	onChange,
	onSave,
	type = "text",
	placeholder,
	unit,
}: {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	value: string;
	onChange: (value: string) => void;
	onSave: () => void;
	type?: string;
	placeholder?: string;
	unit?: string;
}) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
			<div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
				<h3 className="mb-4 text-lg font-semibold">{title}</h3>
				<div className="relative">
					<input
						type={type}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						placeholder={placeholder}
						className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-950"
						autoFocus
					/>
					{unit && (
						<span className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 dark:text-gray-400">
							{unit}
						</span>
					)}
				</div>
				<div className="mt-4 flex gap-2">
					<button
						onClick={onClose}
						className="flex-1 rounded-xl border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
					>
						Cancel
					</button>
					<button
						onClick={() => {
							onSave();
							onClose();
						}}
						className="flex-1 rounded-xl bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}

// Main component
type SettingsPageProps = {
	user?: {
		name: string;
		email: string;
		image?: string;
	};
	onBack: () => void;
	onSignOut: () => void;
};

export default function SettingsPage({ user, onBack, onSignOut }: SettingsPageProps) {
	const [isDark, setIsDark] = useState(false);
	const [name, setName] = useState(user?.name || "John Doe");
	const [email, setEmail] = useState(user?.email || "john@example.com");
	const [weight, setWeight] = useState("75");
	const [fatPercentage, setFatPercentage] = useState("15");
	const [musclePercentage, setMusclePercentage] = useState("40");

	const [editingField, setEditingField] = useState<string | null>(null);
	const [tempValue, setTempValue] = useState("");

	const openEdit = (field: string, currentValue: string) => {
		setEditingField(field);
		setTempValue(currentValue);
	};

	const saveEdit = () => {
		if (editingField === "name") setName(tempValue);
		if (editingField === "email") setEmail(tempValue);
		if (editingField === "weight") setWeight(tempValue);
		if (editingField === "fat") setFatPercentage(tempValue);
		if (editingField === "muscle") setMusclePercentage(tempValue);
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-950">
			{/* Header */}
			<div className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
				<div className="flex items-center gap-3 p-4">
					<button
						onClick={onBack}
						className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
					>
						<ChevronLeft className="h-6 w-6" />
					</button>
					<div>
						<h2 className="text-lg font-semibold">Settings</h2>
						<p className="text-sm text-gray-600 dark:text-gray-400">Manage your preferences</p>
					</div>
				</div>
			</div>

			<div className="space-y-6 p-4">
				{/* Profile Section */}
				<div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
					<div className="flex items-center gap-4">
						<div className="relative">
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-2xl font-bold text-white">
								{name.charAt(0).toUpperCase()}
							</div>
							<button className="absolute right-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 shadow-lg transition-colors hover:bg-blue-600">
								<Camera className="h-4 w-4 text-white" />
							</button>
						</div>
						<div className="min-w-0 flex-1">
							<h3 className="truncate text-lg font-semibold">{name}</h3>
							<p className="truncate text-sm text-gray-500 dark:text-gray-400">{email}</p>
						</div>
					</div>
				</div>

				{/* Appearance */}
				<SettingSection title="Appearance">
					<SettingRow
						icon={isDark ? Moon : Sun}
						label="Dark Mode"
						value={isDark ? "Enabled" : "Disabled"}
					>
						<ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
					</SettingRow>
				</SettingSection>

				{/* Account */}
				<SettingSection title="Account">
					<SettingRow
						icon={User}
						label="Name"
						value={name}
						onClick={() => openEdit("name", name)}
						showChevron
					/>
					<SettingRow
						icon={Mail}
						label="Email"
						value={email}
						onClick={() => openEdit("email", email)}
						showChevron
					/>
				</SettingSection>

				{/* Body Metrics */}
				<SettingSection title="Body Metrics">
					<SettingRow
						icon={Scale}
						label="Weight"
						value={`${weight} kg`}
						onClick={() => openEdit("weight", weight)}
						showChevron
					/>
					<SettingRow
						icon={Activity}
						label="Body Fat"
						value={`${fatPercentage}%`}
						onClick={() => openEdit("fat", fatPercentage)}
						showChevron
					/>
					<SettingRow
						icon={Dumbbell}
						label="Muscle Mass"
						value={`${musclePercentage}%`}
						onClick={() => openEdit("muscle", musclePercentage)}
						showChevron
					/>
				</SettingSection>

				{/* Sign Out */}
				<button
					onClick={onSignOut}
					className="group flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 transition-colors hover:bg-red-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-red-950/20"
				>
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 transition-colors group-hover:bg-red-200 dark:bg-red-950/50 dark:group-hover:bg-red-950">
						<LogOut className="h-4 w-4 text-red-600 dark:text-red-400" />
					</div>
					<span className="text-sm font-medium text-red-600 dark:text-red-400">Sign Out</span>
				</button>

				<div className="pb-4 text-center text-xs text-gray-400 dark:text-gray-600">
					Version 1.0.0
				</div>
			</div>

			{/* Modals */}
			<InputModal
				isOpen={editingField === "name"}
				onClose={() => setEditingField(null)}
				title="Edit Name"
				value={tempValue}
				onChange={setTempValue}
				onSave={saveEdit}
				placeholder="Enter your name"
			/>
			<InputModal
				isOpen={editingField === "email"}
				onClose={() => setEditingField(null)}
				title="Edit Email"
				value={tempValue}
				onChange={setTempValue}
				onSave={saveEdit}
				type="email"
				placeholder="Enter your email"
			/>
			<InputModal
				isOpen={editingField === "weight"}
				onClose={() => setEditingField(null)}
				title="Edit Weight"
				value={tempValue}
				onChange={setTempValue}
				onSave={saveEdit}
				type="number"
				placeholder="Enter your weight"
				unit="kg"
			/>
			<InputModal
				isOpen={editingField === "fat"}
				onClose={() => setEditingField(null)}
				title="Edit Body Fat"
				value={tempValue}
				onChange={setTempValue}
				onSave={saveEdit}
				type="number"
				placeholder="Enter body fat percentage"
				unit="%"
			/>
			<InputModal
				isOpen={editingField === "muscle"}
				onClose={() => setEditingField(null)}
				title="Edit Muscle Mass"
				value={tempValue}
				onChange={setTempValue}
				onSave={saveEdit}
				type="number"
				placeholder="Enter muscle mass percentage"
				unit="%"
			/>
		</div>
	);
}
