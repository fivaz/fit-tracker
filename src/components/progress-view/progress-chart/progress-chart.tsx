import { TrendingUp } from "lucide-react";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

type ProgressData = {
	date: string;
	maxWeight: number;
	totalReps: number;
	volume: number;
};

type ProgressChartProps = {
	data: ProgressData[];
	dataKey: keyof ProgressData;
	title: string;
	color: string;
	unit: string;
};

export function ProgressChart({ data, dataKey, title, color, unit }: ProgressChartProps) {
	return (
		<div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
			<h3 className="mb-4 flex items-center gap-2 font-semibold">
				<TrendingUp className="size-5" style={{ color }} />
				{title}
			</h3>
			<div style={{ width: "100%", height: "256px" }}>
				<ResponsiveContainer>
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
						<XAxis
							dataKey="date"
							className="fill-gray-600 dark:fill-gray-400"
							style={{ fontSize: "12px" }}
						/>
						<YAxis className="fill-gray-600 dark:fill-gray-400" style={{ fontSize: "12px" }} />
						<Tooltip
							contentStyle={{
								backgroundColor: "var(--tooltip-bg)",
								border: "1px solid var(--tooltip-border)",
								borderRadius: "8px",
								color: "var(--tooltip-text)",
							}}
						/>
						<Line
							type="monotone"
							dataKey={dataKey}
							stroke={color}
							strokeWidth={3}
							name={`${title} ${unit}`}
							dot={{ fill: color, strokeWidth: 2, r: 4 }}
							activeDot={{ r: 6 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
