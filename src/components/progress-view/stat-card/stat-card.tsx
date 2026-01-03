export type StatCardProps = {
	label: string;
	value: string | number;
	gradient: string;
};

export function StatCard({ label, value, gradient }: StatCardProps) {
	return (
		<div className={`bg-linear-to-br ${gradient} rounded-2xl p-4 shadow-lg`}>
			<div className="mb-1 text-sm text-white/80">{label}</div>
			<div className="text-2xl font-bold text-white">{value}</div>
		</div>
	);
}
