'use client'
import React, { useState } from 'react';
import { Dumbbell, Play, TrendingUp, Folder, Home } from 'lucide-react';

const StyleTestComponent = () => {
	// Mock State for Testing
	const [view, setView] = useState('home');
	const showBottomNav = true;

	// Mock Data
	const exercises = [
		{ id: '1', name: 'Bench Press' },
		{ id: '2', name: 'Squat' }
	];

	const programs = [
		{ id: '1', name: 'Push Day', exercises: [1, 2, 3] },
		{ id: '2', name: 'Pull Day', exercises: [1, 2] },
		{ id: '3', name: 'Leg Day', exercises: [1, 2, 3, 4] },
		{ id: '4', name: 'Full Body', exercises: [1, 2, 3, 4, 5] },
	];

	const workoutSessions = [{ completed: true }, { completed: true }];
	const selectedProgram = programs[0];

	return (
		<div className="min-h-screen bg-gray-950 text-white pb-20 font-sans">
			<div className="max-w-md mx-auto">
				{view === 'home' && (
					<div className="p-4 space-y-4">
						{/* Header */}
						<div className="pt-2 pb-4">
							<div className="flex items-center gap-2 mb-1">
								<Dumbbell className="w-6 h-6 text-blue-500" />
								<h1 className="text-xl font-bold">FitTracker</h1>
							</div>
							<p className="text-sm text-gray-400">Track your fitness journey</p>
						</div>

						{/* Start Workout Section */}
						<div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-2xl p-5 shadow-lg">
							<div className="flex items-center gap-2 mb-3">
								<Play className="w-5 h-5 fill-current" />
								<h2 className="text-lg font-semibold">Start Workout</h2>
							</div>
							{programs.length > 0 ? (
								<div className="space-y-2">
									{programs.slice(0, 3).map((program) => (
										<button
											key={program.id}
											onClick={() => console.log('Start workout')}
											className="w-full p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl text-left flex items-center justify-between transition-all active:scale-95"
										>
											<div>
												<div className="font-medium">{program.name}</div>
												<div className="text-sm text-blue-100">
													{program.exercises.length} exercises
												</div>
											</div>
											<Play className="w-5 h-5" />
										</button>
									))}
									{programs.length > 3 && (
										<button
											onClick={() => setView('programs')}
											className="w-full p-3 text-center text-sm text-blue-200 hover:text-white transition-colors"
										>
											View all programs →
										</button>
									)}
								</div>
							) : (
								<div className="text-center py-6">
									<p className="text-sm text-blue-100 mb-3">No programs yet</p>
									<button
										onClick={() => setView('programs')}
										className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors"
									>
										Create your first program
									</button>
								</div>
							)}
						</div>

						{/* Stats Grid */}
						<div className="grid grid-cols-2 gap-3">
							<div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
								<div className="text-2xl font-bold mb-1">{workoutSessions.filter(s => s.completed).length}</div>
								<div className="text-sm text-gray-400">Workouts</div>
							</div>
							<div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
								<div className="text-2xl font-bold mb-1">{exercises.length}</div>
								<div className="text-sm text-gray-400">Exercises</div>
							</div>
						</div>

						{/* Quick Actions */}
						<div className="space-y-3">
							<button
								onClick={() => setView('progress')}
								className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between hover:bg-gray-800 transition-colors active:scale-[0.98]"
							>
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
										<TrendingUp className="w-5 h-5 text-green-500" />
									</div>
									<div className="text-left">
										<div className="font-medium">View Progress</div>
										<div className="text-sm text-gray-400">Track your gains</div>
									</div>
								</div>
							</button>

							<button
								onClick={() => setView('programs')}
								className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between hover:bg-gray-800 transition-colors active:scale-[0.98]"
							>
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
										<Folder className="w-5 h-5 text-blue-500" />
									</div>
									<div className="text-left">
										<div className="font-medium">Manage Programs</div>
										<div className="text-sm text-gray-400">{programs.length} programs</div>
									</div>
								</div>
							</button>

							<button
								onClick={() => setView('exercises')}
								className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between hover:bg-gray-800 transition-colors active:scale-[0.98]"
							>
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center">
										<Dumbbell className="w-5 h-5 text-purple-500" />
									</div>
									<div className="text-left">
										<div className="font-medium">Exercise Library</div>
										<div className="text-sm text-gray-400">{exercises.length} exercises</div>
									</div>
								</div>
							</button>
						</div>
					</div>
				)}

				{/* Placeholder for sub-views */}
				{view !== 'home' && (
					<div className="p-10 text-center">
						<h2 className="text-xl mb-4">View: {view}</h2>
						<button
							onClick={() => setView('home')}
							className="px-4 py-2 bg-blue-600 rounded-lg"
						>
							Back Home
						</button>
					</div>
				)}
			</div>

			{/* Bottom Navigation */}
			{showBottomNav && (
				<div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 safe-area-bottom">
					<div className="max-w-md mx-auto flex items-center justify-around py-2">
						{[
							{ id: 'home', icon: Home, label: 'Home' },
							{ id: 'programs', icon: Folder, label: 'Programs' },
							{ id: 'exercises', icon: Dumbbell, label: 'Exercises' },
							{ id: 'progress', icon: TrendingUp, label: 'Progress' },
						].map((item) => (
							<button
								key={item.id}
								onClick={() => setView(item.id)}
								className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
									view === item.id ? 'text-blue-500' : 'text-gray-400'
								}`}
							>
								<item.icon className="w-6 h-6" />
								<span className="text-xs">{item.label}</span>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default StyleTestComponent;